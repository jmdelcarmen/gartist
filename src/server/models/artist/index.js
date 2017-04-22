import mongoose from 'mongoose';
const Schema = mongoose.Schema

const artistSchema = new Schema({
  name: String,
  genre: String,
  group: Boolean
}, { timestamps: true });

export default mongoose.model('Artist', artistSchema);
