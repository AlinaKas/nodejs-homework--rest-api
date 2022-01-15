const mongo = require("mongoose");
const app = require("../app");
// const { mkdir } = require("fs/promises");
const { colors } = require("colors");

const { PORT = 5000, DB_HOST } = process.env;

mongo
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      // mkdir(process.env.UPLOAD_DIR, { recursive: true });
      console.log(`Server running. Use our API on port: ${PORT}`.cyan);
      console.log("Database connection successful".cyan);
    });
  })
  .catch((error) => {
    console.log(error.message.red);
    process.exit(1);
  });
