const { Schema, model } = require("mongoose");

const NotepadSchema = new Schema({
    userId: { type: String, required: true },
    content: { type: Object/* , required: false, default: null */ },
}); 

module.exports = model("Notepad", NotepadSchema);