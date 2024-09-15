import type { Handler } from 'aws-lambda';
import {SendEmailCommand, SESClient, } from '@aws-sdk/client-ses';
import { registerFormTemp } from './emailTemplate';

const sesClient = new SESClient({region: 'ap-south-1'});


export const handler: Handler = async (event, context) => {
  // your function code goes here

  try {
    const {hrefPath, firstName='', lastName='', senderEmail ,receiverEmail, message} = event.argument;


    const htmlBody = registerFormTemp(hrefPath, firstName, lastName);

    const params = new SendEmailCommand({
      Destination: {
        ToAddresses: [receiverEmail],
      },
      Source: senderEmail,
      Message: {
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: message ?? "ASK form",
        },
      }
    });
    await sesClient.send(params);
    return `Email sent with this argument! --- ${JSON.stringify(event.argument)}`;

  } catch(caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }

};