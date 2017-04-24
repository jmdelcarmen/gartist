import mongoose from 'mongoose';
const Schema = mongoose.Schema

const setlistSchema = new Schema({
  name: String,
  comment: String,
  thumbnailUrl: String,
  performanceDate: Date,
  venue: {
    name: String,
    city: String,
    state: String,
  },
  ownerId: { type: Schema.ObjectId, ref: 'User' },
  artist: { type: Schema.ObjectId, ref: 'Artist' },
  songs: [{ type: Schema.ObjectId, ref: 'Song' }],
}, { timestamps: true });

export default mongoose.model('Setlist', setlistSchema);
