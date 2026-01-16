import stripe from "stripe";
import {
  AppSyncResolverHandler,
  AppSyncIdentityCognito,
} from "aws-lambda";

export const handler: AppSyncResolverHandler<any, any> = async (event) => {
  try {
    // 1️⃣ Cast identity to Cognito
    const identity = event.identity as AppSyncIdentityCognito;
    const userId = identity?.sub;

    if (!userId) {
      throw new Error("Unauthorized: No user identity found");
    }

    // --- MAPPING LOGIC ---
    // ⚠️ Ideally fetch this from DB using userId
    const stripeCustomerId = process.env.STRIPE_CUSTOMER_ID!;

    if (!stripeCustomerId) {
      throw new Error("Missing Stripe customer ID");
    }

    // 2️⃣ Initialize Stripe
    const stripeClient = new stripe(
      process.env.STRIPE_SECRET_KEY!,
    );

    // 3️⃣ Create billing portal session
    const session =
      await stripeClient.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url:
          "http://localhost:5173/subscription", // env in prod
      });

    // 4️⃣ Return URL to frontend
    return {
      url: session.url,
    };
  } catch (error: any) {
    console.error("Billing portal error:", error);

    throw new Error(error.message || "Failed to create portal");
  }
};
