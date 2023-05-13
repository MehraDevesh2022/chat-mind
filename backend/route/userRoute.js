const express  = require("express");
const { registerUser, loginController, allSearchUser,   } = require("../controller/userController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();


router.route("/").post(registerUser)
router.route("/login").post(loginController);
router.route("/").get(authentication , allSearchUser);
// router.route("/logout").get (logoutUser);
// router.route("/load").get (authentication , loadUser)

module.exports = router