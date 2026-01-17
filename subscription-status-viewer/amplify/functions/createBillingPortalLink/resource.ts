import { defineFunction } from "@aws-amplify/backend";

export const createBillingPortal = defineFunction({
  entry: "./handler.ts", 
  name: "createBillingPortal",
  environment: { // These stay server-side only
    STRIPE_SECRET_KEY: "XX",
    STRIPE_CUSTOMER_ID: "XX"
  },
});

