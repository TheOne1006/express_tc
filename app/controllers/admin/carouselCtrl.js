'use strict';

var mongoose = require('mongoose'),
  // async = require('async'),
  Carousel = mongoose.model('Carousel');


exports.add = function (req, res, next) {
    console.log(req.body);
    console.log(req.files);
    res.end('ok');
    // Carousel.find(function (err, tags) {
    //   if(err){
    //     return next(err);
    //   }
    //   res.json(tags);
    //   res.end();
    // });
  };