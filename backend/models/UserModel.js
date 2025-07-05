import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },

  // Optional profile picture URL
  profilePic: {
    type: String,
    default: ''  // Or you can use a default image URL here if you like
  },

  // For future “organizations” support
  organizations: [{
    type: Types.ObjectId,
    ref: 'Organization'
  }],

  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member'
  }

}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password to hashed
userSchema.methods.matchPassword = function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default model('User', userSchema);
