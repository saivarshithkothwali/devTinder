const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { run: sendEmail } = require("../utils/sendEmail");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid user ID",
        });
      }

      //Validation for checking whether a user is sending a connection request to himself.
      if (fromUserId.equals(toUserId)) {
        return res.status(400).json({
          success: false,
          error: "Cannot send connection request to yourself",
        });
      }

      //Sending only the allowed status types(Validation3)
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          error: `Status must be one of: ${allowedStatus.join(", ")}`,
        });
      }

      //Can send the conenction request to only the users present in DB collection(Validation2)
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res
          .status(404)
          .json({ success: false, error: "User not Found" });
      }

      //If there is an existing ConnectionRequest(Validation1)
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(409)
          .json({ success: false, error: "Connection request already exists" });
      }

      //Creating a new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      await sendEmail({
        to: "kothwalisaivarshith@gmail.com",
        subject: "New Connection Request",
        body: `${req.user.firstName} is ${status} in connecting with ${toUser.firstName} on DevConnect.`,
      });

      return res.status(201).json({
        success: true,
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      console.error("Error in sending connection request:", err);

      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
