const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const driverModel = require("../models/driver");
// const { validationResult } = require("express-validator");

const ownerSignupFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json({
        error: true,
        result: result.errors[0],
      });
    }
    const { name, email, password, dateOfBirth, phoneNumber } = req.body;

    const emailExists = await ownerModel.findOne({ email });
    if (emailExists) {
      return res
        .status(200)
        .json({ message: "Email already present!", error: true });
    }
    const hashedPass = await bcrypt.hash(password, 10); //hashed here

    const newowner = new ownerModel({
      name,
      phoneNumber,
      email,
      password: hashedPass,
      dateOfBirth,
    });
    const ownerSave = await newowner.save();

    if (ownerSave) {
      // const token = jwt.sign({ ownerId: ownerSave._id }, process.env.SECRET, {
      //   expiresIn: "7d",
      // });
      res
        .status(200)
        .json({ message: "Owner created successfully!", error: false });
    } else {
      res.status(200).json({ message: "No data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in creating owner account",
      error: true,
    });
  }
};
const consoletheData = () => {
  console.log(process.env.SECRET, "driver");
};
// consoletheData();
//
//
const sendDriverHome = async (req, res) => {
  console.log("driver home page");
  await res.send("driverrrrrr");
};
const driverSignupFunc = async (req, res) => {
  try {
    // const result = validationResult(req);

    // if (!result.isEmpty()) {
    //   return res.status(200).json({
    //     error: true,
    //     result: result.errors[0],
    //   });
    // }
    const { Full_name, email, password } = req.body;

    const emailExists = await driverModel.findOne({ email });
    if (emailExists) {
      return res
        .status(200)
        .json({ message: "Email already present!", error: true });
    }
    console.log(`the password before hash: ${password}`);
    const hashedPass = await bcrypt.hash(password, 10); //hashed here

    const newdriver = new driverModel({
      name: Full_name,
      email,
      password: hashedPass,
    });
    const driverSave = await newdriver.save();

    if (driverSave) {
      // const token = jwt.sign({ ownerId: ownerSave._id }, process.env.SECRET, {
      //   expiresIn: "7d",
      // });
      res.status(200).json({
        message: "driver created successfully!",
        error: false,
        driverData: driverSave,
      });
    } else {
      res.status(200).json({ message: "No data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in creating driver account",
      error: true,
    });
  }
};
const driverLoginFunc = async (req, res) => {
  try {
    // const result = validationResult(req);

    // if (!result.isEmpty()) {
    //   return res.status(200).json({
    //     error: true,
    //     result: result.errors[0],
    //   });
    // }
    const { email, password } = req.body;

    const dbDriver = await driverModel.findOne({ email });
    console.log(`the password before hash: ${password}`);
    if (!dbDriver) {
      return res.status(200).json({ message: "Email not found", error: true });
    }
    const passwordMatch = await bcrypt.compare(password, dbDriver.password); //unhashed and compared
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ message: "Password is incorrect", error: true });
    }
    const token = jwt.sign({ DriverId: dbDriver._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    dbDriver.token = token;
    await dbDriver.save();

    res.status(200).json({
      message: "Login successful",
      error: false,
      driverData: dbDriver,
      token: token,
    });
  } catch (err) {
    res
      .status(200)
      .json({ message: err.message || "Something went wrong", error: true });
  }
};

module.exports = {
  ownerSignupFunc,
  sendDriverHome,
  driverSignupFunc,
  driverLoginFunc,
};
