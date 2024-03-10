import NotesModel from "../models/Notes.model.js";

const createNotes = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(200).json({
      code: 0,
      message: "Mising data",
    });
  }

  const createNote = await NotesModel.createNotes(title, content);
  return res.status(200).json(createNote);
};

const getNotes = async (req, res) => {
  const search = req.body.search;
  const getNotes = await NotesModel.getNotes(search);
  return res.status(200).json(getNotes);
};

const deleteNotes = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(200).json({
      code: 0,
      message: "Missing data",
    });
  }
  const deleteNotes = await NotesModel.deleteNotes(id);
  return res.status(200).json(deleteNotes);
};

const updateNotes = async (req, res) => {
  const { id, title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(200).json({
      code: 0,
      message: "Missing data",
    });
  }

  const updateNote = await NotesModel.updateNote(id, title, content);
  return res.status(200).json(updateNote)
};
export { createNotes, getNotes, deleteNotes, updateNotes };
