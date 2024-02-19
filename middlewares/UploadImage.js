const path = require("path");
const multer = require("multer");

const imageStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("articles")) {
      folder = "articles";
    } else {
      folder = "dishes";
    }
    cb(null, `uploads/${folder}`);
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(
        new Error("So aceitamos imagems no formato: (.png) ou (.jpg).")
      );
    }
    cb(undefined, true);
  },
});

module.exports = uploadImage;
