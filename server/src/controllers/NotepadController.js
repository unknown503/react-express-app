const Notepad = require("../models/Notepad");
const NotepadController = {};

NotepadController.getDoc = async (req, res) => {
    const userId = req.params.id
    const notepad = await Notepad.findOne({ userId });
    if (!notepad) {
        const newNotepad = await new Notepad({ userId }).save()
        res.json({ data: newNotepad });
    } else {
        res.json(notepad);
    }
}

NotepadController.handleDoc = async (req, res) => {
    const { content } = req.body;
    await Notepad.findOneAndUpdate({ userId: req.params.id }, { content });
    res.json({ response: true });
}

module.exports = NotepadController;