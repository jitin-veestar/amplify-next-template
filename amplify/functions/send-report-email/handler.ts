import {SendRawEmailCommand, SESClient, } from '@aws-sdk/client-ses';
import mime from 'mime';
import * as MailComposer from 'nodemailer/lib/mail-composer';
import { deliverPdfTemplate } from './emailTemplate';
import { CreateForm1 } from './pdf';

const sesClient = new SESClient({region: 'ap-south-1'});


export const handler = async (event, context) => {
  // your function code goes here
  const fromEmail = 'jitinrathi910949@gmail.com';

  try {
    const {body, senderEmail} = event?.arguments || {};

    const pdf = await CreateForm1(body);
    const buffer = Buffer.from(pdf as any);
    const htmlBody = deliverPdfTemplate();

    const mailOptions = {
      from: fromEmail,
      to: senderEmail,
      subject: "Submission form from ASK medical",
      html: htmlBody,
      attachments: [
        {
          filename: `${body?.patient_information?.patient_name}.pdf`,
          content: buffer,
          contentType: mime.getType('.pdf') || 'application/pdf',
        }
      ]
    };

    const mailComposer = new MailComposer(mailOptions);
    const message = await new Promise((resolve, reject) => {
      mailComposer.compile().build((err, message) => {
        if (err) {
          reject(err);
        } else {
          resolve(message);
        }
      });
    });

    const command = new SendRawEmailCommand({
      RawMessage: {
        Data: message as Uint8Array,
      },
    });


    await sesClient.send(command);
    return `Email sent with this argument! --- ${JSON.stringify(event.argument)}`;

  } catch(caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }

};