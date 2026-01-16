import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { getSubscription } from '../functions/getSubscription/resource';
import { createBillingPortal } from '../functions/createBillingPortalLink/resource';

const schema = a.schema({
  getSubscription: a.query()
    .arguments({
      email: a.string(),
    })
    .returns(a.json()) 
    .handler(a.handler.function(getSubscription))
    .authorization(allow => [allow.authenticated()]),

    createBillingPortal: a.query()
    .returns(a.json()) 
    .handler(a.handler.function(createBillingPortal))
    .authorization(allow => [allow.authenticated()]),

});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // Ensure this is set for logged-in users
  },
});
