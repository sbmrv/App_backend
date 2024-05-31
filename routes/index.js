var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/haha", function (req, res, next) {
  res.render("index", { title: "haha" });
});
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("server connected to DB_URL" + `${process.env.DB_URL}`);
});

module.exports = router;
