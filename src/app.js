const express = require("express");
const connectDB=require("./config/database");
const app = express();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const http=require("http");

require('dotenv').config();

require("./utils/cronjob");

app.use(
  cors({
  origin: ["http://localhost:5173", "https://thedevconnect.in"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());



const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);

const server=http.createServer(app);
initializeSocket(server);





connectDB()
  .then(()=>{
    console.log("Database connected succesfully");

    server.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err)=>{
    console.error("Database cannnot be connected");
  });

