var express = require("express");
var router = express.Router();
var mypalSide = require("../controllers/mypal");

router.post("/", function (req, res) {
  mypalSide.sendUserHome(req, res);
});
/* GET home page. */
// router.get("/driver", sendDriverHome);

module.exports = router;
