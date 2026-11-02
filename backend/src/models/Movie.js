import { Schema, model, Types } from 'mongoose';

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    bannerImg: { type: String },
    videoUrl: { type: String },
    duration: { type: Number, min: 1 },
    releaseYear: { type: Number },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

export default model('Movie', movieSchema);