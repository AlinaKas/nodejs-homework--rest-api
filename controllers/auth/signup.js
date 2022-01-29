const { User } = require("../../models");
const { nanoid } = require("nanoid");
const { sendMail, createEmailTemplate } = require("../../helpers");

// const { sendMailNodeMailer } = require("../../helpers");
const { Conflict } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");

// const { FOLDER_FOR_AVATARS } = process.env;
// const avatarsDir = path.join(__dirname, "../../", "public/avatars");
const avatarsDir = path.resolve("./public/avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} already exists`);
  }
  //Cоздание токена для email-verification
  const verificationToken = nanoid();

  //Cоздание с помощью схемы
  const newUser = new User({ email, verificationToken });

  newUser.setPassword(password);
  await newUser.save();

  //Отправка письма для верификации почты
  await createEmailTemplate(email, verificationToken);

  //Easy way for verification email send - just link
  // const mail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `
  //       <a href="http://:localhost5000/api/users/verify/${verificationToken}">Click here for confirmation your email</a>
  //       `,
  // };
  // await sendMail(mail);
  // await sendMailNodeMailer(mail); // for SendMailer

  //Папка с id для user's avatars
  const avatarFolder = path.join(avatarsDir, String(newUser._id));
  await fs.mkdir(avatarFolder, { recursive: true });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    data: {
      email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};
module.exports = signup;
