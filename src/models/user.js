const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

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
    required:"true",
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email address " +value);
      }
    },
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password " +value);
      }
    },
  },
  age:{
    type:Number,
    min:18,
    
  },
  gender:{
    type:String,
    enum:{
      values:["male","female","others"],
      message:`{VALUE} is not a valid gender type`
    },
    
  },
  photoUrl:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL:"+value);
      }
    },
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

userSchema.methods.getJWT=async function (){
  
  const user=this;
  
  const token=await jwt.sign({_id:this._id},"DEV@Tinder$790",{
    expiresIn:"7d",
  });
  
  return token;
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const passwordHash=user.password;

  const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);

  return isPasswordValid;
}


const User=mongoose.model("User",userSchema);
module.exports=User;