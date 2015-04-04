/**
 * 公用 控制器
 * article 控制器
 */
'use strict';

var mongoose = require('mongoose'),
  // async = require('async'),
  Article = mongoose.model('Article');
  // _ = require('underscore'),
  // Tag = mongoose.model('Tag');

// 文章列表
exports.list = function (req, res, next) {
  Article.find(function (err, articles) {
    if(err){
      return next(err);
    }
    res.json(articles);
    res.end();
  });
};


// 单个文章
exports.getById = function (req, res, next) {
  var _id = req.params.id;
  Article
    .findById(_id)
    .populate('cate')
    .populate('author')
    .exec(function (err, article) {
    if(err){
      return next(err);
    }
    res.json(article);
    res.end();
  });
};

// 文章搜索