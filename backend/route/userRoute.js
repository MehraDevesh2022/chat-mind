const express  = require("express");
const { registerUser, loginController, allSearchUser, logoutUser } = require("../controller/userController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();


router.route("/register").post(registerUser).post(loginController)
router.route("/login").post( loginController)
router.route("/getAll").get(authentication , allSearchUser);
router.route("/logout").get (logoutUser);

module.exports = router