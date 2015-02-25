'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  moment = require('moment'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/login', function (req, res) {
    res.render('admin/login', {
      title: 'Generator-Express MVC'
    });
})
  .get('/',function (req, res) {
    res.render('admin/index', {
      title: 'blog 后台'
    });
  })
  // 验证登录 密码
  .post('/verify/password', function (req, res, next) {
    var user = req.body.user,
      postPwd;
    // 验证过程
    
    // mongodb 验证
    User.findOne({name:user.name},function (err, doc) {
      if(err){
        next(err);
      }

      // null 没有找到
      if(!doc){
        res.end('用户名或者密码错误');
        return;
      }
      postPwd = crypto.createHash('md5').update(user.password).digest('hex');

      if(postPwd !== doc.password){
        res.end('用户名或者密码错误');
        return;
      }

      doc
        .update({
          $set:{
            'lastLoginTime':doc.loginTime,
            'loginTime':moment().format('x'),
            'updateTime':moment().format('x')
            }
          },
    
          function (err) {
            if(err){
              return next(err);
            }
            
            res.end('ok');
          });

    });
  })
  .get('/add/user',function (req, res) {
    var md5 = crypto.createHash('md5').update('qqaazz123');
    var newUser = new User({
      name:'theone',
      password:md5.digest('hex'),
    });
    newUser.save();
    res.end('create new User');
  });
