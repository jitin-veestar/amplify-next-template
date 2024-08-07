import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  IndexForm: a
      .model({
        content: a.string(),
        userId: a.string(),
        name: a.string(),
        facilityEmail: a.string(),
        city: a.string(),
        country: a.string(),
        facilityName: a.string(),
        acceptHippa: a.boolean(),
      })
      .authorization((allow) => [allow.publicApiKey()]),

    addHippaContract: a
      .mutation()
      .arguments({
        content: a.string(),
        userId: a.string(),
        name: a.string(),
        facilityEmail: a.string(),
        city: a.string(),
        country: a.string(),
        facilityName: a.string(),
        acceptHippa: a.boolean(),
      })
      .returns(a.ref("IndexForm"))
      .authorization(allow => [allow.publicApiKey()])
      // .handler(
      //   a.handler.custom({
      //     dataSource: "hippaContractTable",
      //     entry: "./addHippaContract.js",
      //   })
      // )
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