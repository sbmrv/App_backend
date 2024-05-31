var express = require("express");
var router = express.Router();
var driverSide = require("../controllers/driver");
var todoFunctions = require("../controllers/todos");
var auth_driver = require("../libs/driver_auth");
const { check } = require("express-validator");

const signupCheck = [
  check("name", "Name field is required").notEmpty(),
  check("email", "Please enter valid email").isEmail().notEmpty(),
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 3 }),
];
const loginCheck = [
  check("name", "Please enter valid email").notEmpty(),
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 3 }),
];

router.post("/", function (req, res) {
  driverSide.sendDriverHome(req, res);
});
router.post("/driver_signup", function (req, res) {
  driverSide.driverSignupFunc(req, res);
});
router.post("/driver_login", function (req, res) {
  driverSide.driverLoginFunc(req, res);
});
/* GET home page. */
// router.get("/driver", sendDriverHome);
router.get("/getallTodo", auth_driver, function (req, res) {
  todoFunctions.getAllTodo(req, res);
});
router.post("/createTodo", auth_driver, function (req, res) {
  todoFunctions.createTodo(req, res);
});
router.post("/updateTodo", auth_driver, function (req, res) {
  todoFunctions.updateTodo(req, res);
});
router.get("/deleteTodo", auth_driver, function (req, res) {
  todoFunctions.deleteTodo(req, res);
});

module.exports = router;
