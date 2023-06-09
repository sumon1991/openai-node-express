const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  // const { prompt } = req.body;
  const prompt = req.body;
  console.log(prompt);
  // return;
  // Generate a response with ChatGPT
  // const completion = await openai.createCompletion({
  //   // model: "text-davinci-002",
  //   model: "text-davinci-003",
  //   prompt: prompt,
  // });
  // res.send(completion.data.choices[0].text);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // messages: [prompt],
    messages: [{ role: "user", content: req.body.prompt }],
    temperature: 0,
  });
  res.send(completion.data.choices[0].message.content);
});
// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
