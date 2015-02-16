'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Cate = mongoose.model('Cate');

module.exports = function (app) {
  app.use('/admin/cate', router);
};

router
  .get('/',function (req, res, next) {
    Cate.find(function (err, cates) {
      if (err){
        return next(err);
      }
      res.json(cates);
      res.end();
    });
  })
  .put('/add',function (req, res ,next){
    // 验证是否重复
    var newCate = new Cate({type:req.body.newCate,name:req.body.newCate});
    newCate.save(function (err) {
      if(err){
        next(err);
      }
      console.log(req.body.newCate);
      res.end('ok');
    });

  })
  ;
