const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

const applicationMail = async ({ receiver, subject, body }) => {
  const result = await transport.sendMail({
    from: process.env.GMAIL_ADDRESS,
    to: receiver,
    subject,
    html: `
            <html>
              <head>
                <style>
                  a {
                    background-color: yellow;
                  }
                </style>
              </head>
              <body>
                ${body}
              </body>
            </html>
          `
  });
  return result;
};

module.exports = applicationMail;
