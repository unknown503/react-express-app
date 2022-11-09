require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/webapp-react";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on("open", () => {
    console.log("Connected...");
});
