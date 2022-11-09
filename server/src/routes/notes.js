const { Router } = require("express");
const router = Router();
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/NotesController");
const auth = require("../middlewares/auth");

router.route("/")
    .get(auth, getNotes)
    .post(auth, createNote);

router.route("/:id")
    .put(auth, updateNote)
    .delete(auth, deleteNote);
 
module.exports = router;