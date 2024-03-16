import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import stripe from "stripe";

import type { Reference } from "firebase-admin/database";

import serviceAccount from "./serviceAccountKey.json";
import { plans, type Plan } from "./plans";

import {
  PORT,
  CORS_ORIGIN,
  STRIPE_SUCCESS_REDIRECT,
  STRIPE_CANCEL_REDIRECT,
  STRIPE_UPDATE_REDIRECT,
  STRIPE_SECRET,
  STRIPE_ENDPOINT_SECRET,
} from "./config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://clever-fit-6084a-default-rtdb.firebaseio.com",
});

const stripeInstance = new stripe(STRIPE_SECRET, { typescript: true });

const app = express();

app.use(
  express.json({
    limit: "5mb",
    verify: (req, _, buf) => {
      // @ts-ignore
      req.rawBody = buf.toString();
    },
  }),
);

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  }),
);

// Plan subscription checkout session endpoint. (Only for first time subscription)
app.post("/create-checkout-link", async (req, res) => {
  const { planId, customerId } = req.body;

  if (
    planId === undefined ||
    !customerId ||
    typeof planId !== "number" ||
    typeof customerId !== "string" ||
    customerId.length !== 28
  )
    return res.status(400).json({ message: "Bad request" });

  const plan = plans[planId];
  if (!plan) return res.status(404).json({ message: "Plan not found" });

  const user = await admin.auth().getUser(customerId);
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    const session = await stripeInstance.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: plan.price,
          quantity: 1,
        },
      ],
      metadata: {
        userId: customerId,
      },
      success_url: STRIPE_SUCCESS_REDIRECT,
      cancel_url: STRIPE_CANCEL_REDIRECT,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Subscription management portal link endpoint
app.post("/create-billing-portal-link", async (req, res) => {
  const { customerId } = req.body;

  if (!customerId || typeof customerId !== "string" || customerId.length !== 28)
    return res.status(400).json({ message: "Bad request" });

  const user = await admin.database().ref(`users/${customerId}`).once("value");
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.val().subscription || !user.val().subscription.customerId)
    return res.status(403).json({ message: "User has no active subscription" });

  try {
    const session = await stripeInstance.billingPortal.sessions.create({
      customer: user.val().subscription.customerId,
      return_url: STRIPE_UPDATE_REDIRECT,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Stripe webhook endpoint
app.post("/webhooks/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"]!;

  let event: stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      // @ts-ignore
      req.rawBody,
      sig,
      STRIPE_ENDPOINT_SECRET,
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as stripe.Checkout.Session;

      handleCheckoutComplete(session, session?.metadata?.userId as string);
      break;
    case "invoice.payment_succeeded":
      const invoice = event.data.object as stripe.Invoice;
      if (invoice.billing_reason === "subscription_create") return;

      handleInvoiceSucceeded(invoice);
      break;
    case "customer.subscription.updated":
      const subscription = event.data.object as stripe.Subscription;

      const user = await admin
        .database()
        .ref("users")
        .orderByChild("subscription/id")
        .equalTo(subscription.id)
        .once("value");

      if (!user.exists()) return;

      const userId = Object.keys(user.val())[0];
      const userRef = admin.database().ref(`users/${userId}`);

      const priceId = (Object.values(user.val())[0] as any).subscription
        .priceId as string;

      // Subscription canceled
      if (subscription.cancel_at) {
        handleSubscriptionCancel(subscription, userRef, priceId);
        return res.json({ received: true });
      }

      // Subscription updated
      const newPriceId = subscription.items.data[0].price.id;

      if (priceId !== newPriceId) {
        handleSubscriptionUpdate(subscription, userRef, newPriceId);
        return res.json({ received: true });
      }

      // Subscription reactivated
      handleSubscriptionUpdate(subscription, userRef, priceId);
      break;
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as stripe.Subscription;

      handleSubscriptionDelete(deletedSubscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Handle checkout session completion and update the user subscription in the database. (Only for first time subscription)
async function handleCheckoutComplete(
  session: stripe.Checkout.Session,
  userId: string,
) {
  const subscriptionId = session.subscription as string;

  try {
    const subscription =
      await stripeInstance.subscriptions.retrieve(subscriptionId);

    const priceId = subscription.items.data[0].price.id;

    const plan: Plan = Object.values(plans).find(
      (p: Plan) => p.price === priceId,
    );

    await admin
      .database()
      .ref(`users/${userId}`)
      .update({
        access: true,
        subscription: {
          id: subscription.id,
          customerId: subscription.customer as string,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          plan: plan.name,
          priceId,
          cancelled: false,
          cancelAt: null,
          cancelAtPeriodEnd: null,
        },
      });
  } catch (error) {
    console.error(error);
  }
}

// Handle invoice payment succeeded event and update the user subscription in the database. (For recurring subscription)
async function handleInvoiceSucceeded(invoice: stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  try {
    const subscription =
      await stripeInstance.subscriptions.retrieve(subscriptionId);

    const priceId = subscription.items.data[0].price.id;

    const plan: Plan = Object.values(plans).find(
      (p: Plan) => p.price === priceId,
    );

    // Find the user with the matching subscription ID
    const user = await admin
      .database()
      .ref("users")
      .orderByChild("subscription/id")
      .equalTo(subscription.id)
      .once("value");

    const userId = Object.keys(user.val())[0];
    const userRef = admin.database().ref(`users/${userId}`);

    userRef.update({
      access: true,
      subscription: {
        id: subscription.id,
        customerId: subscription.customer as string,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        plan: plan.name,
        priceId,
        cancelled: false,
        cancelAt: null,
        cancelAtPeriodEnd: null,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function handleSubscriptionUpdate(
  subscription: stripe.Subscription,
  userRef: Reference,
  newPriceId: string,
) {
  const newPlan: Plan = Object.values(plans).find(
    (p: Plan) => p.price === newPriceId,
  );

  userRef.update({
    access: true,
    subscription: {
      id: subscription.id,
      customerId: subscription.customer as string,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: newPlan.name,
      priceId: newPriceId,
      cancelled: false,
      cancelAt: null,
      cancelAtPeriodEnd: null,
    },
  });
}

function handleSubscriptionCancel(
  subscription: stripe.Subscription,
  userRef: Reference,
  priceId: string,
) {
  const plan: Plan = Object.values(plans).find(
    (p: Plan) => p.price === priceId,
  );

  userRef.update({
    access: true,
    subscription: {
      id: subscription.id,
      customerId: subscription.customer as string,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: plan.name,
      priceId,
      cancelled: true,
      cancelAt: new Date(subscription.cancel_at! * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

async function handleSubscriptionDelete(subscription: stripe.Subscription) {
  const user = await admin
    .database()
    .ref("users")
    .orderByChild("subscription/id")
    .equalTo(subscription.id)
    .once("value");

  const userId = Object.keys(user.val())[0];
  const userRef = admin.database().ref(`users/${userId}`);

  userRef.update({
    access: false,
    subscription: null,
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
