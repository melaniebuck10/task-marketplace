'use strict';

const mongoose = require('mongoose');

const messengerSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
      trim: true
    },
    receivedId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
      trim: true
    },
    messageBody: {
      type: String,
      trim: true,
      required: true
    },
    sender:{
      type: Boolean,
      default:false
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
