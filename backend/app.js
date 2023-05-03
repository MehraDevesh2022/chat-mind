const express = require("express");
const app = express();
const connectDB = require("../backend/db/connectDB");


const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();



// connect to DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
