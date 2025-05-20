const cron=require("node-cron");
const ConnectionRequest=require("../models/connectionRequest");
const {subDays,startOfDay,endOfDay}=require("date-fns");
const sendEmail=require("./sendEmail");

cron.schedule("03 23 * * *",async()=>{
  //Send emails to all the people who got requests the previous day.

  try{
      const yesterday=subDays(new Date(),0);
      const yesterdayStart=startOfDay(yesterday);
      const yesterdayEnd=endOfDay(yesterday);

      const pendingRequests=await ConnectionRequest.find({
        status:"interested",
        createdAt:{
          $gte:yesterdayStart,
          $lt:yesterdayEnd,
        },
      }).populate("fromUserId toUserId");

      const listOfEmails=[... new Set(pendingRequests.map(req=>req.toUserId.emailId))]
      console.log(listOfEmails);

      for(const email of listOfEmails){

        try{
          const res=await sendEmail.run({
            to: 'kothwalisaivarshith@gmail.com',
            subject: "You have new connection request!",
            body: "Hi there,\n\nYou received new connection requests on DevConnect from "+email +"Check them out!"
          });
          
          console.log(res);
        }catch(err){
          console.error(err);
        }
        
      }
  }
  catch(err){
    console.error(err);
  }
});
