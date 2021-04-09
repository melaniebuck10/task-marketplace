'use strict';

const express = require('express');
const User = require('./../models/user');
const Individual = require('./../models/individual');
const routeGuard = require('./../middleware/route-guard');

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

router.patch('/qualities', routeGuard, async (req, res, next) => {
  const { skills } = req.body;
  const id = req.user._id;
  try {
    const user = await Individual.findByIdAndUpdate(
      id,
      {
        $set: {
          role: 'individual',
          qualities: { skills }
        }
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
