import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const contextData = JSON.parse(fs.readFileSync('./coou_anniversary_ai_model_data.txt', 'utf8'));
const systemPrompt = contextData.systemPrompt;

app.post('/api/gemini', async (req, res) => {
  const userInput = req.body.userInput;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const requestBody = {
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] }, // Add your context/instructions
      { role: "user", parts: [{ text: userInput }] }     // Then the user's question
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    let geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || data.error?.message || "Sorry, I couldn't find an answer.";
    geminiText = geminiText.replace(/\*/g, ''); // Remove all asterisks
    res.json({ text: geminiText });
  } catch (error) {
    res.status(500).json({ text: "Sorry, there was an error connecting to Gemini." });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));