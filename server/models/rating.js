'use strict';

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    taskowner: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User'
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    // review: {
    //   type: String,
    //   minlength: 5,
    //   maxlength: 1500
    // }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Rating', ratingSchema);
