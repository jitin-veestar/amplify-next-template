import { defineBackend } from '@aws-amplify/backend';
import * as iam from "aws-cdk-lib/aws-iam"
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { sendLinkEmail } from './functions/send-link-email/resource';
const backend = defineBackend({
  auth,
  data,
  sendLinkEmail
});

const sendLinkEmailLambda = backend.sendLinkEmail.resources.lambda


const statement = new iam.PolicyStatement({
  sid: "AllowSendEmailLink",
  effect: iam.Effect.ALLOW,
  actions: ["ses:SendEmail",  'ses:SendRawEmail'],
  resources: ['*'],
          conditions: {
            'StringEquals': {
              'ses:FromAddress': 'jitinrathi910949@gmail.com',
            },
          },
});

sendLinkEmailLambda.addToRolePolicy(statement);
