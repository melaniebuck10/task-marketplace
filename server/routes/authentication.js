'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Individual = require('./../models/individual');
const TaskOwner = require('./../models/taskowner');
const nodemailer = require('./../nodemailer');
const fileUpload = require('./../middleware/file-upload');

const router = new Router();

router.post(
  '/sign-up',
  fileUpload.single('profilePicture'),
  async (req, res, next) => {
    const {
      name,
      email,
      password,
      role,
      description,
      address,
      phoneNumber
    } = req.body;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    try {
      const hash = await bcryptjs.hash(password, 10);
      const user = await User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        role,
        description,
        address,
        phoneNumber,
        profilePicture
      });
      req.session.userId = user._id;
      res.json({ user });
      await nodemailer.welcomeEmail(user.email);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/verify', (req, res) => {
  const user = req.user || null;
  res.json({ user: user });
});

module.exports = router;
