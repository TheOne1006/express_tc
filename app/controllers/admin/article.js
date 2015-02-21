/**
 * article 控制器
 */
'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  // async = require('async'),
  Article = mongoose.model('Article'),
  Tag = mongoose.model('Tag');

module.exports = function (app) {
  app.use('/admin/article', router);
};

router
  .put('/add',function (req, res ,next) {
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

      // res.end('ok');
    });
  });