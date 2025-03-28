const validator=require("validator");

const validateSignUpData=(req)=>{

  const {firstName,lastName,emailId,password,age}=req.body;

  if(!firstName || !lastName){
    throw new Error("Name is not valid");
  }
  else if(firstName.length<4 || firstName.length>50)
  {
    throw new Error("firstName should be 4-50 characters");
  }
  else if(!validator.isEmail(emailId))
  {
    throw new Error("emailId is not valid " +emailId);
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Enter a Strong Password " +password);
  }

};

module.exports={validateSignUpData,};