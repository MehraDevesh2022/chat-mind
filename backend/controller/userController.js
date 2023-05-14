const asyncWrapper = require("../middleWare/asyncWrapper");
const UserModel = require("../model/UserModel");
const sendJwtToekn = require("../appUtills/jwtToken");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../appUtills/error");
const userModel = require("../model/UserModel");
 
 

//>>>>>>get all search user expect this user <<<<<<<<<
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public


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
  res.send(users);
});


// >>>>> Create User Api <<<<<<<<< 
//@description     Register new user
//@route           POST /api/user/
//@access          Public
exports.registerUser = asyncWrapper(async (req, res, next) => {
  // cloudinary config for image upload to cloudinary server 


  const myCloud = await cloudinary.v2.uploader.upload(req.body.pic, {
    folder: "profile",
    width: 150,
    crop: "scale",
  }); 
 
    
 

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
    pic: myCloud.secure_url,
  });

  if (user) {
    sendJwtToekn(user, 201, res);
  } else {
    console.log("error");
    return next(new ErrorHandler("Bad request", 400));
  }
});

// >>>>>> login user <<<<<<<<
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
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

   

   const options = {
     expires: new Date(
       Date.now()
     ), 
     httpOnly: true,
   };

   res.status(200).cookie("token", null, options).json({
     success: true,
     message : "Loged out successfully"
   });


})



exports.loadUser = asyncWrapper (async( req , res) =>{


  const user = await  userModel.findById(req.user._id);

  res.status(200).json({
    success: true,
    user, // profile details of user
  });
})