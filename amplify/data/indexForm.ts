import { type ClientSchema, a, defineData } from "@aws-amplify/backend";


const schema = a.schema({
    IndexForm: a
      .model({
        id: a.string(),
        senderEmail: a.string(),
        receiverEmail: a.string(),
        message: a.string(),
        consent: a.boolean(),
        images: a.boolean(),
        password: a.string(),
      })
      .authorization((allow) => [allow.publicApiKey()]),
  });
  
  export type Schema = ClientSchema<typeof schema>;
  
  export const indexFormData = defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "apiKey",
      apiKeyAuthorizationMode: {
        expiresInDays: 30,
      },
    },
  });