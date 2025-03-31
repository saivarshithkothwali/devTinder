const jwt=require("jsonwebtoken");

const userAuth=async(req,res,next)=>{
  //Read the token from request cookies
  const cookies=req.cookies;
  const {token}=cookies;

  const decodedObj=await jwt.verify(token,"DEV@Tinder$790");
};

module.exports={adminAuth,userAuth};