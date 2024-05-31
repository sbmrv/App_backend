const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const driverModel = require("../models/driver");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.headers.token;
  console.log(token, "preset token");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken, "aaa");
    const user = await driverModel.findById(decodedToken.DriverId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "wrong credentials,need login", error });
  }
};