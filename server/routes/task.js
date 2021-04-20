'use strict';

const express = require('express');

const Task = require('./../models/task');
// const User = require('./../models/user');
const Application = require('./../models/application');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const applicationMail = require('./../utilities/application-email');
const router = new express.Router();
const User = require('./../models/user');

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
      hoursOfWork,
      typeOfWork,
      status
    } = req.body;
    console.log(req.body);
    try {
      const task = await Task.create({
        name,
        assignment,
        description,
        price,
        hoursOfWork,
        typeOfWork,
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

// const applications = await Applications.find({
//   individual: { $eq: req.params.id }
// }).populate('task');

router.get('/:id/getapplications', routeGuard, async (req, res, next) => {
  try {
    const applicants = await Application.find({
      task: { $eq: req.params.id },
      decision: { $eq: 'pending' }
    }).populate('individual');
    console.log('APPLICANTS', applicants);
    res.json({ applicants });
  } catch (error) {
    next(error);
  }
});

router.patch(':id/updateapplications', routeGuard, async (req, res, next) => {
  try {
    console.log('PARAMS', req.params.id);
    console.log('REQ BODY', req.body);
    res.json({ foo: 'bar' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', routeGuard, async (req, res, next) => {
  const {
    name,
    assignment,
    description,
    price,
    hoursOfWork,
    typeOfWork,
    status
  } = req.body;
  console.log(req.body);
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(id, {
      name,
      assignment,
      description,
      price,
      hoursOfWork,
      typeOfWork,
      status
    });
    res.json({ task });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/assignTask', routeGuard, async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    // Update the task status from open to in_process
    const assignedTask = await Task.findByIdAndUpdate(id, data, {
      new: true
    }).populate('taskowner');
    res.json({ assignedTask });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/apply', routeGuard, async (req, res, next) => {
  try {
    const application = await Application.create({
      individual: req.user._id,
      task: req.params.id,
      decision: 'pending'
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
