import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import {sendLinkEmail} from '../functions/send-link-email/resource'
import {sendReportEmail} from '../functions/send-report-email/resource'

// const getHippaContractByUserId = defineFunction({
//   entry: './user-handler/handler.ts'
// })
const schema = a.schema({
  IndexForm: a
      .model({
        firstName: a.string().required(),
        lastName: a.string(),
        senderEmail: a.string().required(),
        receiverEmail: a.string().required(),
        message: a.string(),
        consent: a.boolean().default(false),
        images: a.boolean().default(false),
        isFormSubmit: a.boolean().default(false),
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
        senderEmail: a.string(),
        formId: a.string().required(),
      }).returns(a.string()).handler(a.handler.function(sendReportEmail)).authorization(allow => [allow.authenticated()]),
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