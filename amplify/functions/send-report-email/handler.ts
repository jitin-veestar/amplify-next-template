import {SendRawEmailCommand, SESClient, } from '@aws-sdk/client-ses';
import { deliverPdfTemplate } from './emailTemplate';
import { CreateForm1 } from './pdf';

const sesClient = new SESClient({region: 'ap-south-1'});


export const handler = async (event, context) => {
  // your function code goes here
  const fromEmail = 'jitinrathi910949@gmail.com';

  try {
    const {body, senderEmail} = event?.arguments || {};
    const pdf = await CreateForm1(body);
    // const buffer = Buffer.from(pdf as any);
    const htmlBody = deliverPdfTemplate();

    const mailOptions = {
      from: fromEmail,
      to: senderEmail,
      subject: "Submission form from ASK medical",
      html: htmlBody,
      // attachments: [
      //   {
      //     filename: `${body?.patient_information?.patient_name}.pdf`,
      //     content: buffer,
      //     contentType: mime.getType('.pdf') || 'application/pdf',
      //   }
      // ]
    };

    const pdfAttachment = {
      filename:  `${body?.patient_information?.patient_name}.pdf`,
      content: pdf
    }

    const rawEmail = await createRawEmail(fromEmail, senderEmail, mailOptions.subject, mailOptions.html, pdfAttachment);

    // const mailComposer = new MailComposer(mailOptions);
    // const message = await new Promise((resolve, reject) => {
    //   mailComposer.compile().build((err, message) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(message);
    //     }
    //   });
    // });

    const command = new SendRawEmailCommand({
      RawMessage: {
        Data: Buffer.from(rawEmail)
      },
      Source: fromEmail
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

async function createRawEmail(sender, recipient, subject, bodyText, attachment) {
  const boundary = 'NextPart';
  const header = `From: ${sender}\n` +
      `To: ${recipient}\n` +
      `Subject: ${subject}\n` +
      'MIME-Version: 1.0\n' +
      `Content-Type: multipart/mixed; boundary="${boundary}"\n\n`;

  const body = 
      `--${boundary}\n` +
      'Content-Type: text/html; charset=us-ascii\n\n' +
      `${bodyText}\n\n` +
      `--${boundary}\n` +
      'Content-Type: application/pdf;\n' +
      `Content-Disposition: attachment; filename="${attachment.filename}"\n` +
      'Content-Transfer-Encoding: base64\r\n\r\n' +
      `${Buffer.from(await attachment.content).toString('base64')}\n\n` +
      `--${boundary}--`;

  return header + body;
}