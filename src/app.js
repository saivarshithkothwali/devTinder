const express = require("express");
const app = express();

app.use("/user",[
(req, res,next) => {
  console.log("Handling route User 1");
  next();
  
},
(req,res,next)=>{
  console.log("Handling route User 2");
  
  next();
}],
[(req,res,next)=>{
  console.log("Handling route User 3");
  next();
},
(req,res,next)=>{
  console.log("Handling route User 4");
  res.send("Route Handler 4");
}]
);


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
