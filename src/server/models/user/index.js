import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: 'Email is required',
    validate: [validateEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

export default mongoose.model('User', UserSchema);
