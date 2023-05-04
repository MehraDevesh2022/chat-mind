const asyncWrapper = require("../middleWare/asyncWrapper");
const UserModel = require("../model/UserModel");
const sendJwtToekn = require("../appUtills/jwtToken");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../appUtills/error");
 
 
// >>>>> Create User Api <<<<<<<<< 
exports.registerUser = asyncWrapper(async (req, res, next) => {
     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
       folder: "profile",
       width: 150,
       crop: "scale",
     });

     console.log(myCloud.public_id);
     console.log(myCloud.secure_url);
 

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please Enter all the Feilds", 400));
  }

  const userExits = await UserModel.findOne({ email });
 
  if (userExits) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await UserModel.create({
    name,
    password,
    email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  if (user) {
    sendJwtToekn(user, 201, res);
  } else {
    return next(new ErrorHandler("Bad request", 400));
  }
});

// >>>>>> login user <<<<<<<<
exports.loginController = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password"); //.select("+password") because in schema we set set select : false so password is'nt return to anyone so we add +password here for verfication of pass

  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect) {
      sendJwtToekn(user, 201, res);
    } else {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  } else {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});
