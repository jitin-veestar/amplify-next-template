export const registerFormTemp = (
    href: string,
    firstName: string,
    lastName: string
  ) => `
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASK Application - Registration Form</title>
    <style>
      /* Add any additional styling here */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
      }
      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>Hello ${firstName} ${lastName},</p>
      <p>To avoid delays in your upcoming procedure, your doctor has requested you fill out this medical screening questionnaire.</p>
      <p>In order to complete the Pre-Anesthesia process, please click on the button below:</p>
      <p style="text-align: center;"><a class="button" href="${href}" target="_blank">Fill Form</a></p>
      <p>You can copy and paste the following link:</p>
      <p style="text-align: center;"><a href="${href}" target="_blank">${href}</a></p>
      <p>Thank you for choosing ASK!</p>
    </div>
  </body>
  </html>
  `;