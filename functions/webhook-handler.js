const accountSid = process.env.ACCOUNT_SID;
const contentSid = process.env.CONTENT_SID;
const authToken = process.env.AUTH_TOKEN;

require('dotenv').config();
const client = require("twilio")(accountSid, authToken);
const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER;
const receiver_one_phone_number = process.env.RECEIVER1_PHONE_NUMBER;
const receiver_two_phone_number = process.env.RECEIVER1_PHONE_NUMBER;
const receiver_one_name = process.env.RECEIVER1_NAME;
const receiver_two_name = process.env.RECEIVER2_NAME;

const numbers = [
  { number: receiver_one_phone_number, name: receiver_one_name },
  { number: receiver_two_phone_number, name: receiver_two_name },
];

exports.handler = async (event) => {
  try {
    const now = new Date().toLocaleString();

    numbers.forEach(({ name, number }) => {
      client.messages
        .create({
          from: twilio_phone_number,
          contentSid,
          contentVariables: JSON.stringify({ 1: name, 2: now }),
          to: number,
        })
        .then((message) => {})
        .catch((error) => console.error(error));
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event received successfully!" }),
    };
  } catch (error) {
    console.error("Error processing event:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process event." }),
    };
  }
};
