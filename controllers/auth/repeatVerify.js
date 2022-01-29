const { User } = require("../../models/User");
const { NotFound, BadRequest } = require("http-errors");
const { sendMail, createEmailTemplate } = require("../../helpers");

const repeatVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user?.email) {
    throw new NotFound("Missing required field email");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  await createEmailTemplate(email, user.verificationToken);

  // const mail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `
  //       <a href="http://localhost:5000/api/users/verify/${user.verificationToken}">Click here for confirmation your email</a>
  //       `,
  // };

  // await sendMail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = repeatVerify;
