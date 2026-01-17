import { defineFunction } from "@aws-amplify/backend";


//TODO: should i merge those two files under one index.ts file with two consts ??
export const getSubscription = defineFunction({
  entry: "./handler.ts", 
  name: "getSubscription",
  environment: { // These stay server-side only
    STRIPE_SECRET_KEY: "XX",
    STRIPE_CUSTOMER_ID: "XX"
  },
});

