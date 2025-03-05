const express = require("express");
const app = express();

app.use("/user", (req, res) => {
  res.send("Hello from user page...");
});

app.get("/user",(req,res)=>{
  res.send({firstname:"varshith",lastname:"kothwali"});
});


app.post("/user",(req,res)=>{
  res.send("Data Succesfully saved to DB");
});

app.delete("/user",(req,res)=>{
  res.send("Deleted Succesfully");
});

app.use("/home", (req, res) => {
  res.send("Hello from home page...");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
