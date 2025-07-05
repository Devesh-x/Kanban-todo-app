import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: 200
  },

  description: {
    type: String,
    trim: true,
    default: ''
  },

  // Who created the task
  reporter: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Who is responsible for completing it (now multiple users)
  assignees: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }],

  // Optional future “team” or “org” scoping
  organization: {
    type: Types.ObjectId,
    ref: 'Organization',
    default: null
  },

  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },

  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo'
  },

  // Other people watching/following the task
  watchers: [{
    type: Types.ObjectId,
    ref: 'User'
  }],

  // Free‑form tags or labels
  tags: [{
    type: String,
    trim: true
  }],

  // Subtasks (lightweight)
  subTasks: [{
    title:   { type: String, required: true },
    isDone:  { type: Boolean, default: false }
  }],

  // Attachments (e.g., URLs to uploaded files)
  attachments: [{
    filename: { type: String },
    url:      { type: String }
  }],

  // Comments (could be its own collection if large scale)
  comments: [{
    author:    { type: Types.ObjectId, ref: 'User', required: true },
    message:   { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],

  isArchived: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true // adds createdAt & updatedAt
});

export default model('Task', taskSchema);
