import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  IndexForm: a
      .model({
        firstName: a.string(),
        lastName: a.string(),
        senderEmail: a.string(),
        receiverEmail: a.string(),
        message: a.string(),
        consent: a.boolean(),
        images: a.boolean(),
      })
      .authorization((allow) => [allow.publicApiKey()]),

      HippaContract: a.model({
        userId: a.string(),
        name: a.string(),
        facilityEmail: a.string(),
        city: a.string(),
        country: a.string(),
        facilityName: a.string(),
        acceptHippa: a.boolean(),
      }).authorization((allow) => allow.authenticated())
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});