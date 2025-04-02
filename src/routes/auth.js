const express=require("express");
const authRouter=express.Router();

const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");

authRouter.post("/signup",async(req,res)=>{
     
  try
  {
    //validation of data
    validateSignUpData(req);


    //Encrypt the password
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);


    //creating the new instance of the User model
    
    const user=new User({
      firstName,lastName,emailId,password:passwordHash,
    });
   
    await user.save();
    res.send("user Added Succesfully");
  }
  catch(err){
     
    res.status(400).send("ERROR : " + err.message);
    
  }
  
});

authRouter.post("/login",async(req,res)=>{
  try
  {
    const{emailId,password}=req.body;

    const user=await User.findOne({emailId:emailId});
    if(!user)
    {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid=await user.validatePassword(password);

    if(isPasswordValid)
    {
      //Create a JWT Token
      const token=await user.getJWT(); 
      
      //Add the JWT Token to cookie and send the response back to the user
      res.cookie("token",token,{ maxAge: 900000});
      res.send("Login Successful");
    }
    else
    {
      throw new Error("Invalid Credentials");
    }

  }
  catch(err)
  {
    res.status(400).send("ERROR: "+err.message);
  }
});

module.exports=authRouter;