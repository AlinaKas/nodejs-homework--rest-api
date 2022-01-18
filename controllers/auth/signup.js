const { User } = require("../../models");
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
  //Cоздание с помощью схемы
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

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
