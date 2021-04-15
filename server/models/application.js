'use strict';

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    taskowner: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User'
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User'
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Task'
    },
    decision: {
      type: String,
      enum: ['pending', 'approved', 'rejected']
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Application', applicationSchema);
