import type { Handler } from 'aws-lambda';
import * as ses from '@aws-sdk/client-ses';
import { registerFormTemp } from './emailTemplate';

const sesClient = new ses.SESClient({region: 'api-south-1'});


export const handler: Handler = async (event, context) => {
  // your function code goes here
  const senderEmail = 'jitin.rathi@veestarsolutions.in';
  const recipientEmail = 'jitinrathi910949@gmail.com';

  try {
    const {hrefPath, firstName='', lastName='', senderEmail ,receiverEmail, message} = event.argument;


    const htmlBody = registerFormTemp(hrefPath, firstName, lastName);

    const params = new ses.SendEmailCommand({
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