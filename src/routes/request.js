const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");

requestRouter.get("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;
  //Sending a connection Request
  console.log("Sending a connection Request");

  res.send(user.firstName+ " sent the connection Request");
});

module.exports=requestRouter; 