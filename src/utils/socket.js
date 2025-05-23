const socket=require("socket.io");
const crypto=require("crypto");
const {Chat} = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId=(userId,targetUserId)=>{
  return crypto.createHash("sha256").update([userId,targetUserId].sort().join("$")).digest("hex");
}
const initializeSocket=(server)=>{
  const io=socket(server,{
    cors:{
      origin:"http://localhost:5173",
    },
  });
  
  io.on("connection",(socket)=>{
    socket.on("joinChat",({firstName,userId,targetUserId})=>{
      const roomId=getSecretRoomId(userId,targetUserId);
      console.log(firstName+ " Joined room: " +roomId);
      socket.join(roomId);
    });

    
    socket.on("sendMessage",async ({ firstName ,lastName, userId , targetUserId , text })=>{
      

      //Save messages to the database
      try{
        const roomId=getSecretRoomId(userId,targetUserId);
        console.log(firstName+ " " +text);

        //Check if userId and targetUserId are friends 
        ConnectionRequest.findOne({
          $or:[
          { fromUserId: userId, toUserId: targetUserId, status: "accepted"},
          { fromUserId: targetUserId, toUserId: userId, status: "accepted"},
          { fromUserId: userId, toUserId: targetUserId, status: "interested"},
          { fromUserId: targetUserId, toUserId: userId, status: "interested"},
        ],});
        
        if(!ConnectionRequest){
          return res.status(404).json({message: "Connection request not found"});
        }
        
        let chat=await Chat.findOne({
          participants:{ $all:[userId , targetUserId]},

        });

        if(!chat){
          chat=new Chat({
            participants:[userId,targetUserId],
            messages:[],
          });
        }
        chat.messages.push({
          senderId: userId,
          text,
        });
        await chat.save();
        io.to(roomId).emit("messageReceived",{ firstName ,lastName, text});

      }catch(err){
        console.log(err);
      }
      
      
    });

    socket.on("disconnect",()=>{

    });
    
  });
};

module.exports = initializeSocket;
