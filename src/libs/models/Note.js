import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const Note = models.Note || model("Note", noteSchema);

export default Note;
