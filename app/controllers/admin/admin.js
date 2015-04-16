'use strict';

var mongoose = require('mongoose'),
  crypto = require('crypto'),
  // async = require('async'),
  moment = require('moment'),
  User = mongoose.model('User');

exports.checkSession = function  (req, res, next) {

  // 默认 userId
  // if(!req.session.userId){
  //   req.session.userId = '54ede26288d1cb84097a886e';
  // }

  if(req.url !== '/login/' && req.url !=='/login/verify/password' && req.url !=='/login/verify/face'  && !req.session.userId){
    res.redirect('/admin/login/');
    return;
  }

  User.findById(req.session.userId,function  (err, user) {
    if(err){
      return next(err);
    }
    res.locals.user = user;
    next();
  });
};

exports.index = function (req, res) {
        res.render('admin/index',{
          title:'TheOne后台',
        });
  };
  // .get('/add/user',function (req, res) {
  //   var md5 = crypto.createHash('md5').update('qqaazz123');
  //   var newUser = new User({
  //     name:'theone12138',
  //     password:md5.digest('hex'),
  //   });
  //   newUser.save();
  //   res.end('create new User');
  // });
