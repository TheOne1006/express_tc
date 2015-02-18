'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  async = require('async'),
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
      catePType = req.body.catePType;

      if(!cateType || !cateName){
        res.end('type is empty');
      }else{
        var newCate = new Cate({
          type:cateType,
          name:cateName,
          pType:catePType});

          newCate.save(function (err) {
            if(err){
              return next(err);
            }
            res.end('ok');
          });
      }
  })
  // 获取单个 id
  .get('/id/:id', function (req, res, next) {
    var _id = req.params.id;
    Cate.findById(_id,function (err, cate) {
      if(err){
        return next(err);
      }
      res.json(cate);
      res.end();
    });
  })
  //删除单个id
  .delete('/id/:id',function (req, res, next) {
     var _id = req.params.id;

     Cate.findByIdAndRemove(_id, function(err) {
      if(err){
        return next(err);
      }
      res.end();
     });
     console.log('没删除成功');

     res.end();
  });