'use strict';

var mongoose = require('mongoose'),
  // async = require('async'),
  Tag = mongoose.model('Tag');


// 总目录
exports.allList = function (req, res, next) {
    Tag.find(function (err, tags) {
      if(err){
        return next(err);
      }
      res.json(tags);
      res.end();
    });
  };

// 分页
exports.list = function (req, res, next) {
    Tag.find(function (err, tags) {
      if(err){
        return next(err);
      }
      res.json(tags);
      res.end();
    });
  };