const { SendEmailCommand } =require("@aws-sdk/client-ses");
const { sesClient } =require( "./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress,subject,body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
],
  });
};

const run = async ({ to, subject, body }) => {
  const from = "varshith@thedevconnect.in"; // your verified email
  const sendEmailCommand = createSendEmailCommand(to, from, subject, body);

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (err) {
    console.error("SES Email Error:", err);
    if (err instanceof Error && err.name === "MessageRejected") {
      return err;
    }
    throw err;
  }
};


// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports= { run };