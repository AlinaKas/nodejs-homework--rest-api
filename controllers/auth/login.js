// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { BadRequest } = require("http-errors");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { subscription } = user;
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest(`Wrong email or password`);
  }
  //Второй вариант
  //   if (!user) {
  //     throw new NotFound(`User with email=${email} not found`);
  //   }
  //   const compareResult = bcrypt.compareSync(password, user.password);
  //   if (!compareResult) {
  //     throw new Unauthorized(`Wrong password`);
  //   }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = login;
