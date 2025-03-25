const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
     
  
      const user=new User(req.body);
      
      try
      {
        await user.save();
        res.send("user Added Succesfully");
      }
      catch(err){
         
          res.status(400).send("Error saving the user: " + err.message);
        
      }
      
});

// app.get("/user",async (req,res)=>{
//   const userEmail=req.body.emailId;
  
//   try
//   {
//     const users=await User.findOne({emailId:userEmail});
//     if(!users)
//     {
//       res.status(404).send("User not Found");
//     }
//     else{
//       res.send(users);
//     }
    
//   }
//   catch(err){
//       res.status(400).send("Something went wrong");
//   }
// });

// app.get("/user",async (req,res)=>{
//   const userEmail=req.body.emailId;
  
//   try
//   {
//     const users=await User.findOne({});
//     if(!users.length===0)
//     {
//       res.status(404).send("User not Found");
//     }
//     else{
//       res.send(users);
//     }
    
//   }
//   catch(err){
//       res.status(400).send("Something went wrong");
//   }
// });

// app.get("/feed",async (req,res)=>{
//   try{
//     const users=await User.find({});
//     res.send(users);
//   }
//   catch(err){
//     res.status(400).send("Something went wrong");
//   }
// });

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
app.patch("/user",async(req,res)=>{
    const email=req.body.emailId;
    const data=req.body;

    try
    {
      const user=await User.findOneAndUpdate({emailId:email},data,{runValidators:true});
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

