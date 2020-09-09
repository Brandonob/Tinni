const sendSMS = () => {
  const accountSid = "ACef15e13e76e634306bf8b098274b3f45";
  const authToken = "47bca00622e1c34e38cd7a84634ad027";

  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Check out this Itnerary I just created",
      from: "+12058838702",
      to: "+13472338279",
    })
    .then((message) => console.log(message.sid));
};

sendSMS();
