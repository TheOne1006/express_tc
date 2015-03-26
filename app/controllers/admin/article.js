/**
 * article 控制器
 */
'use strict';

var mongoose = require('mongoose'),
  // async = require('async'),
  Article = mongoose.model('Article'),
  Tag = mongoose.model('Tag');

exports.add = function (req, res ,next) {
    // 验证
    var newArticle = new Article(req.body.article);
    newArticle.save(function (err) {
      if(err){
        return next(err);
      }

      Tag.autoSave(newArticle.keyWords,newArticle._id,function (err) {
        if(err){
          return next(err);
        }
        res.end('ok');

      });
    });
  };

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
  Article.findById(_id, function (err, article) {
    if(err){
      return next(err);
    }
    res.json(article);
    res.end();
  });
};


//- 删除单个文章
exports.delById = function (req, res, next) {
  var _id = req.params.id;
  Article.findByIdAndRemove(_id, function (err) {
    if(err){
      return next(err);
    }
    res.end('ok');
  });
};