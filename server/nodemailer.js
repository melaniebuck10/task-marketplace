const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const welcomeEmail = (userEmail) => {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    transport
      .sendMail({
        from: process.env.GMAIL_ADDRESS, // Sender
        to: userEmail, // Receiver
        subject: "Welcome! Happy you're joining us!",
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
                <h1>Welcome!</h1>
                <p>We are happy to have you on board! <a href="https://getstuffdone.netlify.app/">Go and get some tasks done now!</a></p>
                <footer>This email was sent as part of an IronHack class project. We are students learning how to code.</footer>
            </body>
            </html>`
      })
      .then((result) => {
      })
      .catch((error) => {
      });
};

module.exports = {
  welcomeEmail: welcomeEmail
};
