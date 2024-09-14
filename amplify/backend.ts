import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { sendLinkEmail } from './functions/send-link-email/resource';
defineBackend({
  auth,
  data,
  sendLinkEmail
});

