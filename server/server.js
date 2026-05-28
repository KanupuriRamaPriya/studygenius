require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

app.use(express.json()); 
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// THE FIX: Nest the app.listen inside the DB connection success block
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");
    
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running and listening on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB Error:", err));

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Add this simple retry logic in your server.js
app.post('/api/summarize', async (req, res) => {
  try {
    const { notes } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(notes);
    res.json({ summary: result.response.text() });
  } catch (error) {
    if (error.status === 429) {
      res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
    } else {
      console.error("AI Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
});