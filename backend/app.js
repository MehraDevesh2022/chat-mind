const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("../backend/db/connectDB");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middleWare/errorHandler");


// routes 
const userRoute  = require("./route/userRoute"); 


dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(errorMiddleware);



app.use("/api/v1" , userRoute);

// conncet with cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// connect to DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
