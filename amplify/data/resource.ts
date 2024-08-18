import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

const getHippaContractByUserId = defineFunction({
  entry: './user-handler/handler'
})
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
      .authorization((allow) => [allow.authenticated('userPools')]),

      HippaContract: a
      .model({
        userId: a.string(),
        name: a.string(),
        facilityEmail: a.string(),
        city: a.string(),
        country: a.string(),
        facilityName: a.string(),
        acceptHippa: a.boolean(),
      })
      .authorization((allow) => [allow.authenticated('userPools')]),

      getUser: a.query().arguments({userId: a.string()})
      .returns(a.ref('HippaContract'))
      .authorization(allow => [allow.authenticated('userPools')])
      .handler(a.handler.function(getHippaContractByUserId))
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