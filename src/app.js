const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");

app.post("/signup",async(req,res)=>{
      const userObj={
        firstName:"Varshith",
        lastName:"Kothwali",
        emailid:"varshith@gmail.com",
        password:"vars@123",
        age:"23",
        gender:"male"
      };
      const user=new User(userObj);
      
      try
      {
        await user.save();
        res.send("user Added Succesfully");
      }
      catch(err){
        res.status(400).send("Error Saving the user"+err.message);
      }
      
});

connectDB()
  .then(()=>{
    console.log("Database connected succesfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err)=>{
    console.error("Database cannnot be connected");
  });

