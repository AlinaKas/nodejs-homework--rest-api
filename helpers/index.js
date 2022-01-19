const sendMail = require("./sendMail");
const sendMailNodeMailer = require("./sender");
const createEmailTemplate = require("./emailTemplate");

module.exports = {
  sendMail,
  sendMailNodeMailer,
  createEmailTemplate,
};
