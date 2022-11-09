const Note = require("../models/Note");
const NotesController = {};

NotesController.getNotes = async (req, res) => {
    const userId = req.userInfo.id;
    const notes = await Note.find({ author: userId }).sort({ createdAt: 'desc' });
    res.json(notes);
}

NotesController.createNote = async (req, res) => {
    const { content } = req.body;
    const author = req.userInfo.id;
    const newNote = await new Note({
        content,
        author
    });
    await newNote.save();
    res.json({ message: "Note created" });
}

NotesController.updateNote = async (req, res) => {
    const { content, done } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        content, done
    });
    res.json({ message: "Note updated" });
}

NotesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
}

module.exports = NotesController;