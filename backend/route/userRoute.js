const express  = require("express");
const { registerUser, loginController } = require("../controller/userController");
const router = express.Router();


router.route("/register").post(registerUser).post(loginController)
router.route("/login").post(loginController)


module.exports = router