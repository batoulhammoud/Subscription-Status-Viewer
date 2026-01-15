// import stripe from 'stripe';
// import type { AppSyncResolverHandler, AppSyncIdentityCognito } from 'aws-lambda';

// // Define the shape of the data we expect to return

// interface SubscriptionData {
//   id: string;
//   status: string;
//   items: string[]; // List of product IDs
//   // Add currentPeriodEnd if needed in your schema
// }

// interface ResponseData {
//   userId: string;
//   stripeCustomerId: string;
//   subscriptions: SubscriptionData[];
//   billingPortalUrl: string; // The new field for the URL
// }


// export const handler: AppSyncResolverHandler<any, any> = async (event) => {
//   try {
//     // 1. Cast the identity to Cognito to access 'sub' and 'claims'
//     const identity = event.identity as AppSyncIdentityCognito;
//     const userId = identity?.sub;
    
//     if (!userId) {
//       throw new Error('Unauthorized: No user identity found');
//     }

//     // --- MAPPING LOGIC ---
//     const stripeCustomerId = process.env.STRIPE_CUSTOMER_ID!; 

//     // 2. Initialize Stripe
//     // Note: It's best practice to use environment variables for keys!
//     const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

//     // 3. Fetch subscriptions
//     const subscriptions = await stripeClient.subscriptions.list({
//       customer: stripeCustomerId,   
//       status: 'active', //TODO: status can be dynamic based on requirements
//     });


//     // 2. Create the Billing Portal Session URL
//     // We need a 'return_url' for when the user is done in the portal.
//     // In an AppSync context, we don't have request headers directly for the origin URL.
//     // You must hardcode the base URL of your frontend here or pass it as an environment variable.
//     const frontendReturnUrl = 'http://localhost:5173/subscription'; // Replace with your actual frontend URL

//     const portalSession = await stripeClient.billingPortal.sessions.create({
//       customer: stripeCustomerId,
//       return_url: frontendReturnUrl, 
//     });

//     // 4. Return data directly (matching your GraphQL schema expectation)
//     return {
//       userId,
//       stripeCustomerId,
//       subscriptions: subscriptions.data.map(sub => ({
//         id: sub.id,
//         status: sub.status,
//         items: sub.items.data.map(item => item.price.product),
//       })),
//       billingPortalUrl: portalSession.url, // Include the generated URL
//     };

//   } catch (error: any) {
//     console.error('Stripe API error:', error);
//     throw new Error(error.message || 'Failed to fetch subscription status');
//   }
// };




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
