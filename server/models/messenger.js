'use strict';

const mongoose = require('mongoose');

const messengerSchema = new mongoose.Schema(
  {
    taskonwer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    messageBody: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Messenger', messengerSchema);
