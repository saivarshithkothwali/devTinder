const express = require("express");
const app = express();

const {adminAuth,userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
  res.send("User logged in Succesfully");
});

app.get("/user/get",userAuth,(req,res)=>{
  res.send("User data sent");
});

app.get("/admin/deleteUser",(req,res,next)=>{
    
  res.send("Deleted a User");

});

app.get("/admin/getAllData",(req,res,next)=>{
    
    res.send("All Data Sent");
});


  
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
