const asyncWrapper = require("../middleWare/asyncWrapper");
const UserModel = require("../model/UserModel");
const sendJwtToekn = require("../appUtills/jwtToken");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../appUtills/error");
const userModel = require("../model/UserModel");
 
 

//>>>>>>get all search user expect this user <<<<<<<<<

exports.allSearchUser = asyncWrapper(async (req, res) => {
  // Get the search keyword from the query parameter, if present
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" }, // search by name (case-insensitive)
          },
          {
            email: { $regex: req.query.search, $options: "i" }, // search by email (case-insensitive)
          },
        ],
      }
    : {};

  // Find all users that match the search criteria, excluding[$ne: not equals] the currently logged-in user (req.user)
  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });

  // Send the list of matching users in the response
  res.status(200).json({
    success: true,
    users: users,
  });
});


// >>>>> Create User Api <<<<<<<<< 
exports.registerUser = asyncWrapper(async (req, res, next) => {
    
   console.log(req.body);
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


exports.logoutUser = asyncWrapper(async (req , res) =>{

      req.cookies("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

res.status(200).json({
 success : true ,
    message : "User logged out"
  })

})



exports.loadUser = asyncWrapper (async( req , res) =>{


  const user = await  userModel.findById(req.user._id);

  res.status(200).json({
    success: true,
    user, // profile details of user
  });
})