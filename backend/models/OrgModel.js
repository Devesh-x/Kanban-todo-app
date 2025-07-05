// models/Organization.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
    maxlength: 100
  },
  // users who belong to this organization
  members: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  // optional description or metadata
  description: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

export default model('Organization', organizationSchema);
