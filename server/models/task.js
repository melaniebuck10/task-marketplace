'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    taskowner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    assignment: {
      type: String,
      enum: ['single_task', 'project']
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        default: 'Point',
      }
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    hoursOfWork: {
      type: String
    },
    pictures: {
      type: [String]
    },
    typeOfWork: {
      type: String,
      enum: ['physical', 'administrative']
    },
    status: {
      type: String,
      enum: ['open', 'in_process', 'closed']
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Task', taskSchema);
