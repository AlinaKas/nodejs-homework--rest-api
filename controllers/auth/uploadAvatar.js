const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

// const { FOLDER_FOR_AVATARS } = process.env;

const avatarsDir = path.resolve("public/avatars");
// const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const uploadAvatar = async (req, res) => {
  const { _id: id } = req.user;

  const { path: tempUpload, filename } = req.file;
  try {
    const file = await Jimp.read(tempUpload);
    await file.autocrop().cover(250, 250).writeAsync(tempUpload);

    const resultDir = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultDir);
    console.log(tempUpload);
    console.log(resultDir);
    const avatar = path.join(`${id}`, filename);
    // const avatar = path.join(`${id}`, `${id}_${filename}`);

    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL: avatar },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = uploadAvatar;
