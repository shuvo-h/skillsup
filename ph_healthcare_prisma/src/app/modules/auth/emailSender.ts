import nodemailer from "nodemailer";
import { env } from "../../../config/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: env.emailSender.EMAIL_SENDER_MAIL,
    pass: env.emailSender.EMAIL_APP_PASSWORD,
  },
  tls:{
    rejectUnauthorized: false
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function emailSender(email:string,html:string) {
  const info = await transporter.sendMail({
    from: `"PH Health Care 👻" <${env.emailSender.EMAIL_SENDER_MAIL}>`, // sender address
    to: email,
    subject: "Reset Password ✔",
    // text: "Hello world?",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
