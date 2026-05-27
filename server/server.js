require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// 1. ADD THIS: This is the missing piece to read the 'notes' from your frontend!
app.use(express.json()); 

// 2. CLEAN UP: Use only one consolidated CORS configuration
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error("MongoDB Error:", err));

// ... rest of your code stays the same