const express  = require("express");
const { registerUser, loginController, allSearchUser } = require("../controller/userController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();


router.route("/register").post(registerUser).post(loginController)
router.route("/login").post( loginController)
router.route("/users").get(authentication , allSearchUser);

module.exports = router