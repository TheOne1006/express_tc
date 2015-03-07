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