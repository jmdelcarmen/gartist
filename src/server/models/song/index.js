import mongoose from 'mongoose';
const Schema = mongoose.Schema

const songSchema = new Schema({
  name: String,
  type: String,
  lyrics: String,
  duration: Number,
  unreleased: Boolean
}, { timestamps: true });

export default mongoose.model('Song', songSchema);
