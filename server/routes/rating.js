'use strict';

const express = require('express');

const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const router = new express.Router();
const Rating = require('./../models/rating');

router.post(
  '/',
  routeGuard,
  async (req, res, next) => {
    const {
      rating,
      review
    } = req.body;
    console.log(req.body);
    try {
      const rating = await Rating.create({
        rating,
        review,
      });
      res.json({ rating, review });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const rating = await Rating.findById(id);
      res.json({ rating });
    } catch (error) {
      next(error);
    }
  });

router.get('/list', async (req, res, next) => {
  try {
    const ratings = await Rating.find().sort({ addedDate: -1 }).limit(20);
    res.json({ ratings });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
