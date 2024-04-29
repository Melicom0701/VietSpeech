const express = require("express");
const router = express.Router();
const speechRouter = require("./speech.router");



router.use("/speech", speechRouter);




module.exports = router;