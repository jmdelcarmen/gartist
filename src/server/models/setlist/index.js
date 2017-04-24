import mongoose from 'mongoose';
const Schema = mongoose.Schema

const setlistSchema = new Schema({
  artist: { type: Schema.ObjectId, ref: 'Artist' },
  performanceDate: Date,
  comment: String,
  venue: {
    name: String,
    city: String,
    state: String,
  },
  thumbnail: String,
  songs: [{ type: Schema.ObjectId, ref: 'Song' }],
}, { timestamps: true });

export default mongoose.model('Setlist', setlistSchema);
