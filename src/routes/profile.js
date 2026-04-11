const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const USER_SAFE_FIELDS = [
  "firstName",
  "lastName",
  "photoUrl",
  "skills",
  "age",
  "gender",
  "about",
];

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const safeUser = USER_SAFE_FIELDS.reduce((acc, field) => {
      acc[field] = user[field];
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: safeUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    if (!validateEditProfileData(req)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields in edit request",
      });
    }

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
});

module.exports = profileRouter;
