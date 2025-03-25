const mongoose=require("mongoose");

const connectDB=async()=>{
  await mongoose.connect(
    "mongodb+srv://namastedev:joD0C4osLbgcGzKr@namastenode.qyxpw.mongodb.net/devTinder"
  )};
  


  module.exports=connectDB;



