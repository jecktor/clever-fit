# Node server

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. Provide a valid service account key file for Firebase Admin SDK in the src directory with the name `serviceAccountKey.json`.

4. Install the Stripe CLI:

```sh
brew install stripe/stripe-cli/stripe
```

4. Authenticate in the Stripe CLI:

```sh
stripe login
```

5. Run the Stripe CLI to forward webhooks to the local server:

```sh
stripe listen --forward-to localhost:3001/webhooks/stripe -e checkout.session.completed,invoice.payment_succeeded,customer.subscription.updated,customer.subscription.deleted
```

6. Start the development server:

```sh
npm run dev
```
