'use strict';

const express = require('express');
const User = require('./../models/user');
const Individual = require('./../models/individual');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ individual: user });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
