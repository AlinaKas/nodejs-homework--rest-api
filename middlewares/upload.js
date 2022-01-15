const multer = require("multer");
const path = require("path");

// const { UPLOAD_DIR } = process.env;

const tempDir = path.join(__dirname, "../", "uploads");

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(new Error("Wrong file format for avatar"));
  },
  limits: { fileSize: 2048 },
});

const upload = multer({ storage: uploadConfig });

module.exports = upload;
