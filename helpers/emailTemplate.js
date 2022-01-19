const Mailgen = require("mailgen");
const sendMail = require("./sendMail");

const createEmailTemplate = async (email, verificationToken) => {
  const mailGenerator = await new Mailgen({
    theme: "default",
    product: {
      name: "Verification",
      link: `http://localhost:5000/`,
    },
  });

  const emailTemplate = {
    body: {
      name: `${email}`,
      intro: "Welcome! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our API, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `http://localhost:5000/api/users/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const emailBody = mailGenerator.generate(emailTemplate);

  const mail = {
    to: email,
    subject: "Verify email",
    html: emailBody,
  };

  await sendMail(mail);
};

module.exports = createEmailTemplate;
