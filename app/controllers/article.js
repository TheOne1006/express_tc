/**
 * 公用 控制器
 * article 控制器
 */
'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Cate = mongoose.model('Cate'),
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
    .populate({
      path:'cate',
      select:'name',
      options:{limit:1}
    })
    .populate({
      path:'author',
      select:'name',
      options:{limit:1}
    })
    .exec(function (err, article) {
    if(err){
      return next(err);
    }
    res.json(article);
    res.end();
  });
};

// 分类文章
exports.getListByCate = function (req, res, next) {
  var cateAlias = req.params.alias,
  curPage = req.params.page || 1,
  pageCount = 12,
  skipNum = (curPage - 1) * pageCount,
  result = {};

  async.waterfall([
    function (cb) {
      Cate.findByAlias(cateAlias, cb);
    },function (targetCate, cb) {
      result.cate = targetCate;

      Article
        .find()
        .where({cate:targetCate._id})
        .skip(skipNum)
        .limit(pageCount)
        .exec(cb);

    }],function (err, articles) {
      result.articleList = articles;

      if(err) {
        return next(err);
      }
      res.json(result);
      res.end();

    });
};

// 文章搜索