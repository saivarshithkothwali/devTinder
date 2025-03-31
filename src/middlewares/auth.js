const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
  
  try
  {
    //Read the token from request cookies
    const cookies=req.cookies;
    const {token}=cookies;
    if(!token)
    {
      throw new Error("Token is not valid");
    }

    //Validate the token  
    const decodedObj=await jwt.verify(token,"DEV@Tinder$790");
    
    //Extract the _id from decodedObj(This is object destructuring)
    const {_id}=decodedObj;

    //Find the user with that _id
    const user=await User.findById(_id);
    
    if(!user)
    {
      throw new Error("User doesnot exist");
    }
    req.user=user;
    next();
    
  }
  catch(err)
  {
    res.status(400).send("ERROR: " +err.message);
  }
};

module.exports={
  userAuth,
};