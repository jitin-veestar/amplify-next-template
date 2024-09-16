export const deliverPdfTemplate = () => `<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pre-Anesthesia Questionnaire Form</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .header {
        text-align: center;
        margin-bottom: 20px;
    }
    .content {
        margin-bottom: 20px;
    }
    .button {
        display: inline-block;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
    }
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Pre-Anesthesia Questionnaire Form</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>The patient has filled out the pre-anesthesia questionnaire form.</p>
            <p>Please find the PDF attachment containing the details.</p>
        </div>
        <div class="footer">
          <p>Thank you for choosing ASK!</p>
        </div>
    </div>
</body>
</html>
`;