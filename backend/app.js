const express = require("express");
const app = express();
const connectDB = require("../backend/db/connectDB");
const chat = require("./dummy/dummyData");

const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

app.get("/api/v1", (req, res) => {
  res.send("API is running");
});

app.get("/api/v1/chat", (req, res) => {
  res.status(200).send(chat);
});

app.get("/api/v1/chat/:id", (req, res) => {
  console.log(req.params.id);
  const myChat = chat.chats.find((chat) => chat._id === req.params.id);
  res.status(200).send(myChat);
});


// connect to DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
