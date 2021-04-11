'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const taskownerSchema = new mongoose.Schema({
  address: {
    type: String
  },
  phoneNumber: {
    type: Number
  }
});

const Taskowner = User.discriminator('taskowner', taskownerSchema);

module.exports = Taskowner;
