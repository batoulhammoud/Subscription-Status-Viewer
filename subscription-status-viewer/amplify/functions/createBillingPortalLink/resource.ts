import { defineFunction } from "@aws-amplify/backend";

export const createBillingPortal = defineFunction({
  entry: "./handler.ts", // points to your handler file
  name: "createBillingPortal",
  environment: { // These stay server-side only
    STRIPE_SECRET_KEY: "sk_test_51Soou9G3PTiWPNWGuUa42Chju9qhYYmQipBoQ4XIo7DyxinZigQ1uXMw7f694Xn7gpISRihKXu7QnwdtpLkScHcu00OR3750lM",
    STRIPE_CUSTOMER_ID: "cus_TnGgguRgIeyBHF"
  },
});

