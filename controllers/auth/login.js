// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { BadRequest, Unauthorized } = require("http-errors");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest(`Wrong email or password`);
  }
  if (!user?.verify) {
    throw new Unauthorized("Email not verified");
  }
  const { subscription, avatarURL } = user;
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};
module.exports = login;
