'use strict';

var mongoose = require('mongoose'),
  // crypto = require('crypto'),
  // async = require('async'),
  // moment = require('moment'),
  User = mongoose.model('User');

exports.checkSession = function  (req, res, next) {

  if(!req.session.userId) {
    res.redirect('/admin/login/');
    return;
  }

  if(req.session && req.session.userId) {
    User.findById(req.session.userId,function  (err, user) {
      if(err){
        return next(err);
      }
      res.locals.user = user;
      next();
    });
  } else {
    // 没有session.userId
    next();
  }
};

// exports.index = function (req, res) {
//   };
  // .get('/add/user',function (req, res) {
  //   var md5 = crypto.createHash('md5').update('xxxx');
  //   var newUser = new User({
  //     name:'theone12138',
  //     password:md5.digest('hex'),
  //   });
  //   newUser.save();
  //   res.end('create new User');
  // });
