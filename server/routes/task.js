'use strict';

const express = require('express');

const Task = require('./../models/task');
// const User = require('./../models/user');
const Application = require('./../models/application');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const applicationMail = require('./../utilities/application-email');
const router = new express.Router();

router.post(
  '/',
  routeGuard,
  fileUpload.array('pictures', 10),
  async (req, res, next) => {
    const pictures = req.files.map((file) => file.path);
    const {
      name,
      assignment,
      description,
      price,
      hourOfWork,
      status
    } = req.body;
    console.log(req.body);
    try {
      const task = await Task.create({
        name,
        assignment,
        description,
        price,
        hourOfWork,
        status,
        taskowner: req.user._id,
        pictures
      });
      res.json({ task });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/list', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ addedDate: -1 }).limit(20);
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', routeGuard, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'taskowner',
      'name'
    );
    let application = null;
    if (req.user) {
      application = await Application.findOne({
        task: req.params.id,
        individual: req.user._id
      });
    }
    res.json({ task, application });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/apply', routeGuard, async (req, res, next) => {
  try {
    const application = await Application.create({
      individual: req.user._id,
      task: req.params.id
    });
    // const task = await Task.findById(req.params.id);
    // const taskowner = await User.findById(task.taskowner);
    // await sendEmail({
    //   receiver: taskowner.email,
    //   subject: `${req.user.name} applied to this task ${task.name}`,
    //   body: `
    //        <p>${req.user.name} applied to this task ${task.name}.</p>
    //        <p>${req.user.name}'s email is "${req.user.email}".</p>
    //      `
    // });
    res.json({ application });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
