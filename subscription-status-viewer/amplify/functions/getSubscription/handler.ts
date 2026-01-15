import Stripe from "stripe";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  try {
    /* 1️⃣ Get user identity from JWT (Cognito) */
    const claims =
      event.requestContext.authorizer?.jwt?.claims;

    const userId =
      claims?.sub ||
      event.requestContext.authorizer?.claims?.sub;

    if (!userId) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Unauthorized: No user identity found",
        }),
      };
    }

    /* 2️⃣ Map user → stripe customer */
    const stripeCustomerId =
      process.env.STRIPE_CUSTOMER_ID!;

    /* 3️⃣ Init Stripe */
    const stripeClient = new Stripe(
      process.env.STRIPE_SECRET_KEY!,
      {
        apiVersion: "2023-10-16",
      }
    );

    /* 4️⃣ Fetch subscriptions */
    const subscriptions =
      await stripeClient.subscriptions.list({
        customer: stripeCustomerId,
        status: "active",
      });

    /* 5️⃣ Return proxy response */
    return {
      statusCode: 200,
      body: JSON.stringify({
        userId,
        stripeCustomerId,
        subscriptions: subscriptions.data.map(
          (sub) => ({
            id: sub.id,
            status: sub.status,
            items: sub.items.data.map(
              (item) => item.price.product
            ),
          })
        ),
      }),
    };
  } catch (error: any) {
    console.error("Stripe API error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          error.message ||
          "Failed to fetch subscription status",
      }),
    };
  }
};
