require("dotenv").config();
const express = require("express");
const app = express();
const { sendNotification, sendMulticast } = require("./send-service");

app.use(express.json());

app.post("/send-notification", async (req, res) => {
  try {
    const response = await sendNotification(req.body);
    res.status(200).json({
      success: true,
      messageId: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/send-multicast", async (req, res) => {
  try {
    const response = await sendMulticast(req.body);
    res.status(200).json({
      success: true,
      responses: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${PORT} is running`);
});
