/**
 * 公用 控制器
 * search 控制器
 */
'use strict';

var mongoose = require('mongoose'),
  // async = require('async'),
  Article = mongoose.model('Article');
  // _ = require('underscore'),
  // Tag = mongoose.model('Tag');

// 文章搜索
exports.goAngthing = function (req, res, next) {
  var searchWord = req.params.searchWord;

  var params = new RegExp(searchWord);

  /**
   *  mogoose regex 使用
   *  mongoose or 使用
   *  mongoose  match an array element
   */
  Article
    .find()
    .or([{title:{$regex:params,$options: 'i'}},
      {contentText:{$regex:params,$options: 'i'}},
      {keyWords:searchWord},
      ])
    .populate('cate','name')
    .exec(function (err, results) {
      if(err){
        return next(err);
      }
      res.json(results);
    });
};
