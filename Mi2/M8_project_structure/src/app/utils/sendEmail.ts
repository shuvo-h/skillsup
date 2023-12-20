import nodemailer from 'nodemailer';
import { env } from '../config/config';

export const sendEmail = async (
  to: string[],
  name: string,
  subject: string,
  htmlBody: string,
  plainText: string,
) => {
  if (!env.smtp_host) {
    return;
  }
  const transporter = nodemailer.createTransport({
    port: parseInt(env.smtp_port as string),
    host: env.smtp_host,
    secure: env.isProduction,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: env.smtp_user_email,
      pass: env.smtp_pass,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${name} 👻" <${env.smtp_user_email}>`, // sender address with name
    to: to.join(', '), // list of receivers email ["a@mail.com","b@mail.com"]
    subject, // Subject line
    text: plainText, // plain text body
    html: htmlBody, // html body
  });

  console.log('Message sent: %s', info.messageId);
};
