import { defineFunction, secret } from "@aws-amplify/backend";


//The standard practice for Amplify is to keep the function definition (resource.ts) close to its logic (handler.ts). 
// If you merge them into one file, you end up with a "Lambda Monolith" where one folder contains multiple handlers, 
// which can get messy.

export const getSubscription = defineFunction({
  entry: "./handler.ts", 
  name: "getSubscription",
  environment: { // These stay server-side only
    STRIPE_SECRET_KEY: secret("STRIPE_SECRET_KEY"),
    STRIPE_CUSTOMER_ID: secret("STRIPE_CUSTOMER_ID"),
  },
});

