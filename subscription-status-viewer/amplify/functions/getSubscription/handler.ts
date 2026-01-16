// import stripe from 'stripe';
// import type { AppSyncResolverHandler, AppSyncIdentityCognito } from 'aws-lambda';

// // Define the shape of the data we expect to return



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


    

//     // 4. Return data directly (matching your GraphQL schema expectation)
//     return {
//       userId,
//       stripeCustomerId,
//       subscriptions: subscriptions.data.map(sub => ({
//         id: sub.id,
//         status: sub.status,
//         items: sub.items.data.map(item => item.price.product),
//       })),
//     };

//   } catch (error: any) {
//     console.error('Stripe API error:', error);
//     throw new Error(error.message || 'Failed to fetch subscription status');
//   }
// };




import stripe from "stripe";
import type {
  AppSyncResolverHandler,
  AppSyncIdentityCognito,
} from "aws-lambda";


export const handler: AppSyncResolverHandler<any, any> = async (
  event
) => {
  try {
    /*  Get user */
    const identity =
      event.identity as AppSyncIdentityCognito;

    const userId = identity?.sub;

    if (!userId) {
      throw new Error(
        "Unauthorized: No user identity found"
      );
    }

    /* Map user → stripe customer */
    const stripeCustomerId =
      process.env.STRIPE_CUSTOMER_ID!;

    /* Init Stripe */
    const stripeClient = new stripe(
      process.env.STRIPE_SECRET_KEY!
    );

    /*Fetch ALL subscriptions (no filter) */
    const subscriptions =
      await stripeClient.subscriptions.list({
        customer: stripeCustomerId,
        status: "all", 
        expand: ["data.items.data.price"],
      });

    // console.log("Fetched subscriptions:", subscriptions);
    // console.log(" subscription status:", subscriptions.data.map(sub => sub.status));

      const productIds = new Set<string>();

      subscriptions.data.forEach(sub => {
        sub.items.data.forEach(item => {
          productIds.add(item.price.product as string);
        });
      });

      const products = await Promise.all(
        [...productIds].map(id =>
          stripeClient.products.retrieve(id)
        )
      );

      const productMap = products.reduce(
        (acc, product) => {
          acc[product.id] = product.name;
          return acc;
        },
        {} as Record<string, string>
      );

    /*  Return actual status from Stripe */
    // return {
    //   userId,
    //   stripeCustomerId,
    //   subscriptions: subscriptions.data.map(
    //     (sub) => ({
    //       id: sub.id,
    //       status: sub.status, //  dynamic status
    //       items: sub.items.data.map(
    //         (item) => item.price.product

    //       ),
        
         
    //     })
    //   ),
    // };


    return {
      userId,
      stripeCustomerId,
      subscriptions: subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        items: sub.items.data.map(item => {
          const productId =
            item.price.product as string;

          return productMap[productId];
        }),
      })),
    };

    

  
  } catch (error: any) {
    console.error("Stripe API error:", error);
    throw new Error(
      error.message ||
        "Failed to fetch subscription status"
    );
  }
};
