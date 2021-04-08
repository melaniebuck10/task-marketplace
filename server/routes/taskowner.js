'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/user');
const Pet = require('./../models/taskowner');

const routeGuard = require('../middleware/route-guard');

const router = new express.Router();

// router.get('/:id', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const shelter = await User.findById(id);
//     const pets = await Pet.find({ shelter: id });
//     const aggregateDonations = await Donation.aggregate([
//       { $match: { shelter: mongoose.Types.ObjectId(id) } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const donations = aggregateDonations.length && aggregateDonations[0].total;
//     res.json({ shelter, pets, donations });
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
