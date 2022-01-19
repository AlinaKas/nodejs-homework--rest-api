const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASSWORD, NODEMAILER_USER } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMailNodeMailer = async (data) => {
  const newEmail = {
    ...data,
    from: NODEMAILER_USER,
  };
  await transporter.sendMail(newEmail);
};
module.exports = sendMailNodeMailer;
