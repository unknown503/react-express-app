const express = require("express");
const { getChatMessages, getTest } = require("../controllers/ChatController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.route("/", auth).get(getChatMessages);
//testing
router.get("/test", getTest);

module.exports = router;
