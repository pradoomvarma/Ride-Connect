const nodemailer = require("nodemailer");

const sendMail = async ({ subject, to, text }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quanthub4@gmail.com',
      pass: process.env.pass
    }
  });
  return await transporter.sendMail({
    from: 'quanthub4@gmail.com',
    to,
    subject,
    text
  });
}

module.exports = sendMail;