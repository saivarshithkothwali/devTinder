const express=require("express");
const userRouter=express.Router();

const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
      const loggedInUser=req.user;

      const connectionRequests=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",

      }).populate("fromUserId","firstName lastName photoUrl");
      //}).populate("fromUserId",["firstName ,lastName","photoUrl"]);
      
      res.json({
        message:"Data fetched succesfully",
        data:connectionRequests,
      });
    }
    catch(err){
      res.status(400).send("ERROR: " +err.message);
    }
});

const USER_SAFE_DATA="firstName lastName photoUrl skills age gender about";

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
          $or:[{toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
          ],
          
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data=connectionRequests.map((row)=>{
          if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
              return row.toUserId;
          }
        //   if(row.fromUserId._id.equals(loggedInUser._id)){
        //     return row.toUserId;
        // }
          return row.fromUserId;
          
        });
        res.json({data});
    }
    catch(err){
      res.status(400).send("ERROR: " +err.message);
    }
});


module.exports=userRouter;