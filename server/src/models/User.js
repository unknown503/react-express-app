const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

UserSchema.methods.encriptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", UserSchema);