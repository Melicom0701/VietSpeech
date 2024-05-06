const express = require("express");
const router = express.Router();
const  mediaMiddleware = require("../middlewares/media.middleware.js");
const speechController = require("../controllers/speech.controller");
const multer = require('multer');

const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, "audio.webm");
    }
  });
  const upload = multer({ storage: storage });



router.post("/pronunciation", upload.single('stream') , mediaMiddleware.converter,speechController.pronunciation);
module.exports = router;
