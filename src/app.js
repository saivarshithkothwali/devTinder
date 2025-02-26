const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("Hello from home page...");
});

app.get("/about", (req, res) => {
  res.send("Hello from about page...");
});

// Catch-all route for undefined paths
app.get("*", (req, res) => {
  res.send("Hello from main page...");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
