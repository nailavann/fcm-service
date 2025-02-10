require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const app = express();

// Firebase admin initialization
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

app.use(express.json()); 

app.use((req, res, next) => {
  console.log("📩 Yeni bir istek alındı:", req.method, req.url);
  next(); // Bir sonraki middleware'e geç
});

app.post("/create-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(200).json({
      message: "✅ Kullanıcı başarıyla oluşturuldu",
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
