import mongoose, { Schema } from "mongoose";

const directorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  birthyear: {
    type: Number,
  },
  bio: {
    type: String,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const DirectorSchema = mongoose.model("Director", directorSchema);

export default DirectorSchema;
