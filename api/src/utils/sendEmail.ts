"use strict";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // create reusable transporter object using the default SMTP transport
  // TODO setup OATH
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // type: "OAuth2",
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASS,
      // clientId: process.env.OAUTH_CLIENTID,
      // clientSecret: process.env.OAUTH_CLIENT_SECRET,
      // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  } as SMTPTransport.Options);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mintro Support" <sam@mintro.page>', // sender address
    to, // list of receivers
    subject: "Mintro Password Reset", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
