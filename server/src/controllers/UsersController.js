const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UsersController = {};

UsersController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
/*
UsersController.getUser = async (req, res) => {
    const note = await User.findById(req.params.id);
    res.json(note);
}

UsersController.createUser = async (req, res) => {
    const { username, password } = req.body;
    const newUser = await new User({
        username, password
    });
    newUser.password = await newUser.encriptPassword(password);
    await newUser.save();
    res.json({ message: "User created" });
}

UsersController.updateUser = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id).exec();
    const match = await user.matchPassword(oldPassword);

    if (!match) {
        res.json({ message: "Wrong password" })
    } else {
        await User.findByIdAndUpdate(req.params.id, {
            password: await user.encriptPassword(newPassword)
        });
        res.json({ message: "User updated" });
    }
}

UsersController.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
}
 */

UsersController.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const user = await User.findOne({ username });

        const correctCredentials = user != null ? await user.matchPassword(password) : false;
        if (!correctCredentials) return res.json({ error: true, message: "Invalid Credentials" });

        const EXPIRES_IN = process.env.EXPIRES_IN;
        const token = jwt.sign({ username: user.username, id: user._id }, PRIVATE_KEY, { expiresIn: EXPIRES_IN });
        res.json({ error: false, result: { username: user.username, id: user._id }, token });
    } catch (error) {
        res.status(500).json({ error: true, message: "Something went wrong." });
    }
}

UsersController.signUp = async (req, res) => {
    try {
        const { username, password, repassword } = req.body;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.json({ error: true, message: "User already exists." });
        if (password != repassword) return res.json({ error: true, message: "Passwords are different." });

        const NewUser = await User.create({ username, password });
        NewUser.password = await NewUser.encriptPassword(password);
        await NewUser.save();

        const EXPIRES_IN = process.env.EXPIRES_IN;
        const token = jwt.sign({ username: NewUser.username, id: NewUser._id }, PRIVATE_KEY, { expiresIn: EXPIRES_IN });
        res.json({ error: false, result: { username: NewUser.username, id: NewUser._id }, token });
    } catch (error) {
        res.status(500).json({ error: true, message: "Something went wrong." });
    }
}

/* UsersController.refreshToken = (req, res) => {
    try {
        if (req.headers.authorization) {

            const PRIVATE_KEY = process.env.PRIVATE_KEY;
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.PRIVATE_KEY, async (err, result) => {
                if (err) return res.json({ message: "Invalid Token." });
                //res.json(result);
                const user = await User.findOne({ _id: result.id, username: result.username });
                if (user) {
                    const EXPIRES_IN = process.env.EXPIRES_IN;
                    const newToken = jwt.sign({ username: user.username, id: user._id }, PRIVATE_KEY, { expiresIn: EXPIRES_IN });
                    res.json({ result: { username: user.username, id: user._id }, newToken });
                } else {
                    res.status(403).json({ message: "Invalid Token." });
                }
            });
        } else {
            res.status(401).json({ message: "Not logged in." });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
} */

module.exports = UsersController;