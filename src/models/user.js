const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50,
  },
  lastName:{
    type:String,
    
  },
  emailId:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    min:18,
    max:75,
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender is not valid");
      }
    },
  },
  photoUrl:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
  },
  about:{
    type:String,
    default:"This is default about the user",
  },
  skills:{
    type:[String],
    
  },

},
{
  timestamps:true,
});

const User=mongoose.model("User",userSchema);
module.exports=User;