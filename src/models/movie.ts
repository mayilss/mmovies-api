import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Number,
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: "Director",
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  trailerPath: {
    type: String,
    required: true,
  },
});

const MovieSchema = mongoose.model("Movie", movieSchema);

export default MovieSchema;
