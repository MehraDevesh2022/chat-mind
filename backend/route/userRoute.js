const express  = require("express");
const { registerUser, loginController, allSearchUser, logoutUser, loadUser } = require("../controller/userController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();


router.route("/register").post(registerUser).post(loginController)
router.route("/login").post( loginController)
router.route("/getAll").get(authentication , allSearchUser);
router.route("/logout").get (logoutUser);
router.route("/load").get (authentication , loadUser)

module.exports = router