const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
                if (err) return res.json({ error: true, message: "Invalid token." });
                req.userInfo = user;
                next();
            });
        } else {
            res.status(403).json({ error: true, message: "Not logged in." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: "Something went wrong." });
    }
}

module.exports = auth;