const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl");
    //}).populate("fromUserId",["firstName ,lastName","photoUrl"]);

    res.status(200).json({
      success: true,
      message: "Data fetched succesfully",
      data: connectionRequests,
    });
  } catch (err) {
    console.error("Error reviewing connection requests received:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const USER_SAFE_DATA = "firstName lastName photoUrl skills age gender about";

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      //   if(row.fromUserId._id.equals(loggedInUser._id)){
      //     return row.toUserId;
      // }
      return row.fromUserId;
    });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log("Error viewing connections: " + err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      (hideUsersFromFeed.add(req.fromUserId.toString()),
        hideUsersFromFeed.add(req.toUserId.toString()));
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = userRouter;
