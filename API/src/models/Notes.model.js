import mongoose, { Document, Schema } from "mongoose";

const NotesSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});
const Notes = mongoose.model("Notes", NotesSchema);

const createNotes = async (title, content) => {
  try {
    const saveNotes = await Notes.create({
      title,
      content,
    });
    if (!saveNotes) {
      return {
        code: 0,
        message: "Save data faild",
      };
    }
    return {
      code: 1,
      message: "Save data success",
    };
  } catch (error) {
    return {
      code: 0,
      message: "Save data faild (excep)",
    };
  }
};

const getNotes = async (search) => {
  let getData;
  try {
    if (!search) {
      getData = await Notes.find({});
    } else {
      const searchConditions = {
        $or: [{ title: search }, { content: search }],
      };
      getData = await Notes.find(searchConditions);
    }
    console.log(getData);
    return {
      code: 1,
      message: "Get data success",
      data: getData,
    };
  } catch (error) {
    return {
      code: 0,
      message: "Get data fail",
    };
  }
};

const deleteNotes = async (id) => {
  // check ID notes
  try {
    const getNotes = await Notes.findByIdAndDelete(id);
    if (!getNotes) {
      return {
        code: 0,
        message: "Delete note fail, Note not existed",
      };
    }
    return {
      code: 1,
      message: "Delete note success",
    };
  } catch (error) {
    return {
      code: 0,
      message: "Delete notes fail (except)",
    };
  }
};

const updateNotes = async (id, title, content) => {
  //check id
  try {
    const updateNotes = await Notes.findByIdAndUpdate(id, { title, content });
    if (!updateNotes) {
      return {
        code: 0,
        message: "Update note fail, Note not existed",
      };
    }
    return {
      code: 1,
      message: "Update note success",
    };
  } catch (error) {
    return {
      code: 0,
      message: "Update note success",
    };
  }
};
export default { createNotes, getNotes, deleteNotes, updateNotes };
