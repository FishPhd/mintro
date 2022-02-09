"use strict";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // create reusable transporter object using the default SMTP transport
  // TODO setup OATH
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASS,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as SMTPTransport.Options);

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: `"Mintro Support"  ${process.env.SUPPORT_EMAIL}`,
      to, // list of receivers
      subject: "Mintro Password Reset", // Subject line
      html,
    },
    function (error, response) {
      if (error) {
        console.log("Failed in sending mail");
        console.dir({ success: false, existing: false, sendError: true });
        console.dir(error);

        console.log("Message sent: %s", response.messageId);
        console.log("Message sent to: %s", to);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
      } else {
        console.log("Successful in sending email");
        console.dir({ success: true, existing: false, sendError: false });
        console.dir(response);
      }
    }
  );
}
