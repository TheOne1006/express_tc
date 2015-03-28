/**
 * article 控制器
 */
'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Article = mongoose.model('Article'),
  _ = require('underscore'),
  Tag = mongoose.model('Tag');

exports.add = function (req, res ,next) {
    // 验证
    var newArticle = new Article(req.body.article);

    async.waterfall([
      function (cb) {
        newArticle.save(function (err, article) {
          if(err){
            return cb(err);
          }
          cb(null, article._id);
        });    
      },
      function (articleId, cb) {
        Tag.autoSave(newArticle.keyWords, articleId, cb);
      }
      ],function (err) {
      if(err){
        res.end(err);
        return;
      }
      res.end('is_add');
    });

  };

// 更新
exports.edit = function (req, res, next) {
  var editArticle = req.body.article;
  var delTagArr = []; // del keywords
  var AddTagArr = []; // append new keywords

  console.log(editArticle);

  async.waterfall([
      // 获取原始对象
      function  (cb) {
        Article.findById(editArticle._id,cb);

        // get difference keywords
      },function (oriArticle, cb) {
        delTagArr = _.difference(oriArticle.keyWords, editArticle.keyWords);
        AddTagArr = _.difference(editArticle.keyWords, oriArticle.keyWords);

        cb();
        // 删除 Tag 记录
      },function (cb) {
        if(delTagArr.length === 0){
          return cb();
        }

        // 添加新增记录
      },function (cb) {
        if(AddTagArr.length === 0){
          return cb();
        }
        
      }

    ],function (err) {
      if(err){
        res.end(err);
        return;
      }
      res.end('edit_ok');
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
  Article
    .findById(_id)
    .populate('cate')
    .exec(function (err, article) {
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