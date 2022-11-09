const { Router } = require("express");
const router = Router();
const { getDoc, handleDoc } = require("../controllers/NotepadController");
const auth = require("../middlewares/auth");

router.route("/:id")
    .get(auth, getDoc)
    .post(auth, handleDoc);
 
module.exports = router;