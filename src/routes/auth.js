const express = require("express");
const authRouter = express.Router();

const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //Check existing user
    const { firstName, lastName, emailId } = req.body;
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered",
      });
    }

    //Encrypt the password
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //creating the new instance of the User model

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    //Create a JWT Token
    const token = await savedUser.getJWT();

    //Add the JWT Token to cookie and send the response back to the user
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //Validation of Data
    const validationError = validateLoginData(req);

    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    //Finding the user in DB
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    //Comparing the password
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Create a JWT Token
      const token = await user.getJWT();

      //Add the JWT Token to cookie and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("error while logging in ", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now()),
  });
  res.status(200).json({ success: true, message: "Logout Successful" });
});

module.exports = authRouter;
