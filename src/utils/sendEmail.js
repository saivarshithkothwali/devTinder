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
          Data: "This is text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject,body,toEmailId) => {
  console.log(`Sending email to: ${toEmailId}`);
  const sendEmailCommand = createSendEmailCommand(
    toEmailId,
    "varshith@thedevconnect.in",
    subject,
    body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    console.error("SES Email Error:", caught);
    if (caught instanceof Error && caught.name === "MessageRejected") {
      
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports= { run };