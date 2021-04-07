'use strict';

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
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
    review: {
      type: String,
      minlength: 50,
      maxlength: 1500
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Rating', ratingSchema);
