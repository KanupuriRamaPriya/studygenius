require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error("MongoDB Error:", err));

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/summarize', async (req, res) => {
  try {
    const { notes } = req.body;
    
    // Using a simpler initialization
    // Change this line in your server.

// Change this line in your server.js
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    const result = await model.generateContent(notes);
    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error("AI Error:", error);
    // If it fails, this will tell us if it's an API Key or Model error
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));