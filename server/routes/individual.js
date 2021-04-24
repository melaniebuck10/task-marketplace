'use strict';

const express = require('express');
const User = require('./../models/user');
const Individual = require('./../models/individual');
const routeGuard = require('./../middleware/route-guard');
const Task = require('./../models/task');
const Applications = require('./../models/application');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const individual = await User.findById(id);
    const individualInfo = await Individual.find({ individual: id });
    res.json({ individual, individualInfo });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const {
    name,

    description,
    email
  } = req.body;
  try {
    const individual = await Individual.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        email
      },
      { new: true }
    );
    res.json({ individual });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/applications', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ addedDate: -1 }).limit(20);
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/myapplications', async (req, res, next) => {
  try {
    const applications = await Applications.find({
      individual: { $eq: req.params.id }
    }).populate('task');
    res.json({ applications });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
