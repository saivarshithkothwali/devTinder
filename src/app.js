const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
     
  try
  {
    //validation of data
    validateSignUpData(req);


    //Encrypt the password
    const {firstName,lastName,emailId,password,age}=req.body;
    const passwordHash=await bcrypt.hash(password,10);


    //creating the new instance of the User model
    
    const user=new User({
      firstName,lastName,emailId,password:passwordHash,age
    });
   
    await user.save();
    res.send("user Added Succesfully");
  }
  catch(err){
     
    res.status(400).send("ERROR : " + err.message);
    
  }
  
});

app.post("/login",async(req,res)=>{
    try
    {
      const{emailId,password}=req.body;

      const user=await User.findOne({emailId:emailId});
      if(!user)
      {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);

      if(isPasswordValid)
      {
        //Create a JWT Token
        const token=await jwt.sign({_id:user._id},"DEV@Tinder$790"); 
        
        //Add the JWT Token to cookie and send the response back to the user
        res.cookie("token",token);
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

app.get("/profile",userAuth,async(req,res)=>{
  
  try
  {
    const user= req.user;
    res.send(user);
  }
  catch(err)
  {
    res.status(400).send("ERROR: "+err.message);
  }
  
  
});

connectDB()
  .then(async()=>{
    console.log("Database connected succesfully");

    await User.init();
    
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err)=>{
    console.error("Database cannnot be connected");
  });

