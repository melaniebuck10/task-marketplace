'use strict';

const express = require('express');
const Message = require('../models/messenger');
const User = require('../models/user');
const routeGuard = require('../middleware/route-guard');

const router = new express.Router();

router.get('/', routeGuard, (req, res, next) => {
  res.json({ text: 'hello world' });
});

 router.get('/:id', routeGuard, (req, res, next) => {
   const id = req.params.id;
   Message.updateMany({ senderId: { $eq: req.user._id } }, { sender: true })
     .then(() => {
       return Message.find({
         $or: [
           {
             $and: [
               { senderId: { $eq: id } },
               { receiverId: { $eq: req.user._id } }
             ]
           },
           {
             $and: [
               { senderId: { $eq: req.user._id } },
               { receiverId: { $eq: id } }
             ]
           }
         ]
       })        .populate('senderId')
         .populate('receiverId');
     })
    .then((messages) => {
       User.findById(id).then((receiver) => {
         res.render('message/chat-room', { messages, receiver });
         Message.updateMany(
           { senderId: { $eq: req.user._id } },
           { sender: false }
         ).then((message) => {});
       });
     })
     .catch((error) => {
       next(error);
     });
 });

module.exports = router;
