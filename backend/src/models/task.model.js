const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    createdAt: {
      type: Number,
      default: () => Date.now(),
    },
    completedAt: {
      type: Number,
      default: null,
    },
  }
);

module.exports = mongoose.model('Task', taskSchema);
