const { Router } = require("express");
const router = Router();
const { login, signUp, getUsers } = require("../controllers/UsersController");

router.get("/", getUsers);
router.post("/login", login);
router.post("/signup", signUp);
//router.post("/refreshToken", refreshToken);

module.exports = router;
