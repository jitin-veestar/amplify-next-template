import { defineBackend } from '@aws-amplify/backend';
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam"
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { sendLinkEmail } from './functions/send-link-email/resource';
import { sendReportEmail } from './functions/send-report-email/resource';

const backend = defineBackend({
  auth,
  data,
  sendLinkEmail,
  sendReportEmail
});

const sendLinkEmailLambda = backend.sendLinkEmail.resources.lambda;

const sendReportEmailLambda = backend.sendReportEmail.resources.lambda; 


const statement = new PolicyStatement({
  sid: "AllowSendEmailLink",
  effect: Effect.ALLOW,
  actions: ["ses:SendEmail",  'ses:SendRawEmail'],
  resources: ['*'],
          conditions: {
            'StringEquals': {
              'ses:FromAddress': 'jitinrathi910949@gmail.com',
            },
          },
});

sendLinkEmailLambda.addToRolePolicy(statement);
sendReportEmailLambda.addToRolePolicy(statement);
