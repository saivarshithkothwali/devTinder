const { SESClient } =require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ 
  region: REGION,
  credentials:{
    accessKeyId: process.env.AWS_SES_Access_Key,
    secretAccessKey: process.env.AWS_SES_Secret_Access_Key,

  },

});
module.exports= { sesClient };