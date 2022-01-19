const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_USER } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: SENDGRID_USER };
  await sgMail
    .send(email)
    .then(() => console.log("Verification email sent".yellow))
    .catch((error) => console.error(error.message.red));
  return true;
};

module.exports = sendMail;
