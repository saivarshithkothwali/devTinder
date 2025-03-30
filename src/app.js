const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());


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

      if(isPasswordValid){
        //Create a JWT Token


        //Add the JWT Token to cookie and send the response back to the user
        res.cookie("token","asdfgetfhryhgjuyk");
        res.send("Login Successful");
      }
      else{
        throw new Error("Invalid Credentials");
      }

    }
    catch(err)
    {
      res.status(400).send("ERROR: "+err.message);
    }
});

app.post("/signup",async(req,res)=>{
     
      
      try{
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

//Find the user by emailId
app.get("/user",async (req,res)=>{
  const userEmail=req.body.emailId;
  
  try
  {
    const users=await User.findOne({emailId:userEmail});
    if(!users)
    {
      res.status(404).send("User not Found");
    }
    else{
      res.send(users);
    }
    
  }
  catch(err){
      res.status(400).send("Something went wrong");
  }
});

//find the users
app.get("/user",async (req,res)=>{
  const userEmail=req.body.emailId;
  
  try
  {
    const users=await User.findOne({});
    if(!users.length===0)
    {
      res.status(404).send("User not Found");
    }
    else{
      res.send(users);
    }
    
  }
  catch(err){
      res.status(400).send("Something went wrong");
  }
});


app.get("/feed",async (req,res)=>{
  try{
    const users=await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed",async (req,res)=>{
  const userId=req.body.userId;
  try{
    const users=await User.findById(userId);
    res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user",async(req,res)=>{
    const userId=req.body._id;
    try
    {
      const user=await User.findByIdAndDelete({_id:userId});
      res.send("User deleted Succesfully");
    }
    catch(err)
    {
      res.status(400).send("Something went wrong");
    }
});

//Update the data of the user
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    
    
    try
    {

      const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
      const isUpdateAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
      );
      if(!isUpdateAllowed){
        throw new Error("Update not allowed");
      }

      if(data?.skills.length>10){
        throw new Error("skills cannot be more than 10");
      }


      const user=await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
      console.log(user);
      res.send("User updated succesfully");
    }
    catch(err)
    {
      res.status(400).send("Update Failed:"+err.message);
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

