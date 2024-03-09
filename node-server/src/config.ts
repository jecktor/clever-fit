import "dotenv/config";

export const PORT = process.env.PORT || 3001;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

export const STRIPE_SUCCESS_REDIRECT =
  process.env.STRIPE_SUCCESS_REDIRECT || "";
export const STRIPE_CANCEL_REDIRECT = process.env.STRIPE_CANCEL_REDIRECT || "";
export const STRIPE_UPDATE_REDIRECT = process.env.STRIPE_UPDATE_REDIRECT || "";

export const STRIPE_SECRET = process.env.STRIPE_SECRET || "";
export const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET || "";
