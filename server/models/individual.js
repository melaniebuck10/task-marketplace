'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const individualSchema = new mongoose.Schema({
  qualities: {
    description: {
      type: [String],
      required: true
    },
    skills: {
      type: [String],
      enum: []
    }
  }
});

const Individual = User.discriminator('individual', individualSchema);

module.exports = Individual;
