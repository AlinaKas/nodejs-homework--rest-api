const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

// const { FOLDER_FOR_AVATARS } = process.env;
// const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const avatarsDir = path.resolve("./public/avatars"); //папка для хранения аватаров

const uploadAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const destination = path.join(`${id}`, filename); //путь к папке для аватаров пользователя
  const resultPath = path.join(avatarsDir, destination);
  try {
    const file = await Jimp.read(tempUpload);
    await file.autocrop().cover(250, 250).writeAsync(tempUpload); //форматирование аватара

    await fs.rename(tempUpload, resultPath);
    const avatar = path.join("/avatars", `${id}`, filename); //путь к аватару для API
    // const avatar = path.join(`${id}`, `${id}_${filename}`); // добавляет id к имени файла

    await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL: avatar,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = uploadAvatar;
