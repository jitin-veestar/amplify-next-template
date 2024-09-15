import { defineFunction } from '@aws-amplify/backend';

export const sendLinkEmail = defineFunction({
  name: 'send-link-email',
  entry: './handler.ts'
});