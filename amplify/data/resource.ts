import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import {sendLinkEmail} from '../functions/send-link-email/resource'

// const getHippaContractByUserId = defineFunction({
//   entry: './user-handler/handler.ts'
// })
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
      .authorization(allow => [allow.guest().to(['get']) ,allow.owner()]),

      sendLinkEmail: a.query().arguments({
        hrefPath:a.string(),
         firstName: a.string(),
          lastName: a.string(),
           senderEmail: a.string(),
           receiverEmail: a.string(),
           message: a.string()
      }).returns(a.string()).handler(a.handler.function(sendLinkEmail)).authorization(allow => [allow.authenticated()]),

      HippaContract: a
      .model({
        userId: a.id().required(),
        name: a.string(),
        facilityEmail: a.string(),
        city: a.string(),
        country: a.string(),
        facilityName: a.string(),
        acceptHippa: a.boolean(),
      })
      .authorization((allow) => [allow.owner()]),

      generateReport: a.query().arguments({
        body: a.json(),
        senderEmail: a.string()
      }).returns(a.string()).handler(a.handler.function(sendLinkEmail)).authorization(allow => [allow.authenticated()]),




      // getUser: a.query().arguments({userId: a.string()})
      // .returns(a.ref('HippaContract'))
      // .authorization(allow => [allow.authenticated('userPools')])
      // .handler(a.handler.custom({
      //   dataSource: a.ref('HippaContract'),
      //   entry: './user-handler/handler.ts'

      // }))
      // .handler(a.handler.function(getHippaContractByUserId))
});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});