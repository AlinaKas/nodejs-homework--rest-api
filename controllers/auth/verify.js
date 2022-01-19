const { User } = require("../../models/User");
const { NotFound, BadRequest } = require("http-errors");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    // throw new NotFound("User not found");
    throw new BadRequest("Invalid token");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Email is verified",
  });
};

module.exports = verify;
