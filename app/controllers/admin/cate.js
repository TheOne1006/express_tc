'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  // async = require('async'),
  Cate = mongoose.model('Cate');

module.exports = function (app) {
  app.use('/admin/cate', router);
};

router
  .get('/all',function (req, res, next) {
    Cate.find(function (err, cates) {
      if (err){
        return next(err);
      }
      res.json(cates);
      res.end();
    });
  })
  // 分页查询
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
    var cateType = req.body.cateType,
      cateName = req.body.cateName,
      catePid = req.body.catePid;

      if(!cateType || !cateName){
        res.end('type is empty');
      }else{
        var newCate = new Cate({
          type:cateType,
          name:cateName,
          pid:catePid});

          newCate.save(function (err) {
            if(err){
              return next(err);
            }
            res.end('ok');
          });
      }
  })
  .delete('/remove',function (req, res, next) {
     var id = req.body.id;
     console.log(id);
     res.end();
  });