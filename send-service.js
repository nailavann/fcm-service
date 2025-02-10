const admin = require("./firebase");

const sendNotification = async (reqBody) => {
  const { title, body, token, data } = reqBody;
  const message = {
    notification: {
      title,
      body,
    },
    data: data || {},
    token,
  };
  return await admin.messaging().send(message);
};


const sendMulticast = async (reqBody) => {
  const { title, body, tokens, data } = reqBody;
  const message = {
    notification: {
      title,
      body,
    },
    data: data || {},
    tokens,
  };
  return await admin.messaging().sendMulticast(message);
};

module.exports = { sendNotification, sendMulticast };