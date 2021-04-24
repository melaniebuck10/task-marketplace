'use strict';

const express = require('express');

const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const router = new express.Router();
const Rating = require('./../models/rating');

router.post('/create', routeGuard, async (req, res, next) => {
  const { individual, rating, review } = req.body;
  try {
    const ratingDocument = await Rating.create({
      individual,
      rating,
      review
    });
    res.json({ rating: ratingDocument });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const ratings = await Rating.find({ individual: id });
    res.json({ ratings });
  } catch (error) {
    next(error);
  }
});

// router.get('/list', async (req, res, next) => {
//   try {
//     const ratings = await Rating.find().sort({ addedDate: -1 }).limit(20);
//     res.json({ ratings });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
