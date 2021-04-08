'use strict';

const express = require('express');
// const mongoose = require('mongoose');

const User = require('../models/user');

// const routeGuard = require('../middleware/route-guard');
const Taskowner = require('./../models/taskowner');
const Task = require('./../models/task');

const router = new express.Router();

// rating options

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    // profile info
    const taskowner = await User.findById(id);
    const taskownerInfo = await Taskowner.find({ taskowner: id });
    // tasks of this owner
    const tasksOfOwner = await Task.find({ taskowner: id });
    res.json({ taskowner, taskownerInfo, tasksOfOwner });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
