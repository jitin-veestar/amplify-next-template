// import { type ClientSchema, a, defineData } from "@aws-amplify/backend";


// const schema = a.schema({
//     IndexForm: a
//       .model({
//         content: a.string(),
//         userId: a.string(),
//         name: a.string(),
//         facilityEmail: a.string(),
//         city: a.string(),
//         country: a.string(),
//         facilityName: a.string(),
//         acceptHippa: a.boolean(),
//       })
//       .authorization((allow) => [allow.authenticated()]),
//     Post: a.customType({
//     content: a.string(),
//     userId: a.string(),
//     name: a.string(),
//     facilityEmail: a.string(),
//     city: a.string(),
//     country: a.string(),
//     facilityName: a.string(),
//     acceptHippa: a.boolean(),
//   }),
//   });
  
//   export type Schema = ClientSchema<typeof schema>;
  
//   export const hippaContractData = defineData({
//     schema,
//     authorizationModes: {
//       defaultAuthorizationMode: "apiKey",
//       apiKeyAuthorizationMode: {
//         expiresInDays: 30,
//       },
//     },
//   });