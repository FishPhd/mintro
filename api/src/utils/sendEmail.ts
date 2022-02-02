"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();
  //console.log("testAccount", testAccount);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "674703eb4672ca",
      pass: "901e613b5b2eba",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mintro Support" <sam@mintro.page>', // sender address
    to, // list of receivers
    subject: "Change password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
