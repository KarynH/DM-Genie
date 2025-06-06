import Together from "together-ai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

app.get("/status", (req, res) => {
  res.send("alive?");
});

app.post("/ai-agent", async (req, res) => {
  const { prompt } = req.body;

  const response = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ response: response.choices[0].message.content });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //panicking!
  console.log(`Server is running on port! ${PORT}`);
});

//
