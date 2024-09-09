const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' }); // Replace with your region

 const sendEmail = async (source: any, recipient: any, body: string, sub: string) => {
  const params = {
    Destination: {
      ToAddresses: recipient, // Replace with your recipient
    },
    Message: {
      Body: {
        Text: { Data: body || "Hello from Amplify and SES!" },
      },
      Subject: { Data: sub || "Test Email" },
    },
    Source: source, // Replace with your verified sender email address
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default {sendEmail};