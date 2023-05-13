const express = require("express");
const { authentication } = require("../middleWare/auth");
const { getAllMessage, sendMessage } = require("../controller/messageController");
const router = express.Router();



router.route("/:chatId").get(authentication, getAllMessage);
router.route("/").post(authentication  , sendMessage);

module.exports = router