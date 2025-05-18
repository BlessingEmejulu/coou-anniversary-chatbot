console.log('Backend started!');

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/gemini', async (req, res) => {
  console.log('Received request to /api/gemini'); // Add this line
  const userInput = req.body.userInput;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  const requestBody = {
    contents: [{ parts: [{ text: userInput }] }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    console.log('Gemini API response:', data); // <-- Add this line
    const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || data.error?.message || "Sorry, I couldn't find an answer.";
    res.json({ text: geminiText });
  } catch (error) {
    console.error('Gemini API error:', error); // <-- Add this line
    res.status(500).json({ text: "Sorry, there was an error connecting to Gemini." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));