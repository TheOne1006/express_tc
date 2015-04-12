'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Cate = mongoose.model('Cate'),
  Article = mongoose.model('Article');

exports.allList = function (req, res, next) {
    Cate.find(function (err, cates) {
      if (err){
        return next(err);
      }
      res.json(cates);
      res.end();
    });
  };

  // 分页查询
exports.list = function (req, res, next) {
    Cate.find(function (err, cates) {
      if (err){
        return next(err);
      }
      res.json(cates);
      res.end();
    });
  };

exports.add = function (req, res ,next){
    var cateObj = req.body.cate;

    async.waterfall([
      function (cb) {
        if(!cateObj || !cateObj.name){
          return cb('err');
        }
        cb();
      },
      function (cb) {
        var newCate = new Cate(cateObj);

        newCate.save(function (err) {
          if(err){
            return cb(err);
          }
          cb();
        });
      }
      ],function (err) {
        if(err){
          return next(err);
        }
        res.end('add ok');
      });

  };

  // 获取单个 id
exports.getById = function (req, res, next) {
    var _id = req.params.id;
    Cate
      .findByIdAndParent(_id, function (err, cate) {
        if(err){
          return next(err);
        }
      res.json(cate);
      res.end();
    });
  };

  //删除单个id
exports.delById = function (req, res, next) {
     var _id = req.params.id;

     Cate.findByIdAndRemove(_id, function(err) {
      if(err){
        return next(err);
      }
      res.end();
     });
  };

// editById
exports.editById = function (req, res, next) {
  var cateId = req.params.id;
  var editCate = req.body.cate;

  async.waterfall([
    // 统计多少文章
    function (cb) {
      Article
        .count({cate:cateId},cb);
    },
    function (countResult, cb) {
      
      Cate.findByIdAndUpdate(cateId,
      {
        alias:editCate.alias,
        weight:editCate.weight,
        articleNum:countResult,
        topArticles:editCate.topArticles
      },cb);
    }
  ],function (err) {
    if(err) {
      return next(err);
    }
    res.end('ok');
  });
};