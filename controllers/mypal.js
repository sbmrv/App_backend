// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const ownerModel = require("../models/owner");
// const { validationResult } = require("express-validator");

// const ownerSignupFunc = async (req, res) => {
//   try {
//     const result = validationResult(req);

//     if (!result.isEmpty()) {
//       return res.status(200).json({
//         error: true,
//         result: result.errors[0],
//       });
//     }
//     const { name, email, password, dateOfBirth, phoneNumber } = req.body;

//     const emailExists = await ownerModel.findOne({ email });
//     if (emailExists) {
//       return res
//         .status(200)
//         .json({ message: "Email already present!", error: true });
//     }
//     const hashedPass = await bcrypt.hash(password, 10); //hashed here

//     const newowner = new ownerModel({
//       name,
//       phoneNumber,
//       email,
//       password: hashedPass,
//       dateOfBirth,
//     });
//     const ownerSave = await newowner.save();

//     if (ownerSave) {
//       // const token = jwt.sign({ ownerId: ownerSave._id }, process.env.SECRET, {
//       //   expiresIn: "7d",
//       // });
//       res
//         .status(200)
//         .json({ message: "Owner created successfully!", error: false });
//     } else {
//       res.status(200).json({ message: "No data is submitted!", error: true });
//     }
//   } catch (err) {
//     res.status(200).json({
//       message: err.message || "Something went wrong in creating owner account",
//       error: true,
//     });
//   }
// };
const sendUserHome = async (req, res) => {
  console.log("user home page");
  await res.send("Userrrrrrrr");
};
const login = async (req, res, userType) => {
  if (userType === "mypal") {
    // Handle user login
  } else if (userType === "driver") {
    // Handle admin login
  } else {
    // Handle invalid user type
    res.status(400).json({ error: "Invalid user type" });
  }  
};
module.exports = {
  sendUserHome,
};
