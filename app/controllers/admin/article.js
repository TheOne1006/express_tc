/**
 * article 控制器 管理员权限
 */
'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Article = mongoose.model('Article'),
  _ = require('underscore'),
  Tag = mongoose.model('Tag'),
  publicArticle = require('../article');


  _.extend(exports, publicArticle);


exports.allList = function (req, res, next) {

  var limit = req.param('limit') || 10,
    page = req.param('page') || 1,
    keyword = req.param('keyword') || '',
    options = {
      limit: limit,
      page: page,
      keyword: keyword
    };

  Article
    .list( options , false, function (err, results) {
      if(err) {
        return next(err);
      }
      res.json(results);
      res.end();
    });

};


// 文章列表
exports.list = function (req, res, next) {
  var pageSize = (req.body && req.body.pageSize)? req.body.pageSize : 10,
    page = (req.body && req.body.page)? req.body.page : 1,
    searchText = (req.body && req.body.searchText)? req.body.searchText : '',
    regParams = '';


    // 带关键字
    if(searchText && searchText !== ''){
      regParams = new RegExp(searchText);

      Article
        .find()
        .or([{title:{$regex:regParams,$options: 'i'}},
          {contentText:{$regex:regParams,$options: 'i'}},
          {keyWords:searchText},
          ])
        .skip(pageSize * (page - 1) )
        .limit(pageSize)
        .populate('cate','name')
        .exec(function (err, results) {
          if(err){
            return next(err);
          }
          res.json(results);
          res.end();
        });

    // 不带关键字
    }else {

      Article
        .find()
        .skip(pageSize * (page - 1) )
        .limit(pageSize)
        .populate('cate','name')
        .exec(function (err, results) {
          if(err){
            return next(err);
          }
          res.json(results);
          res.end();
        });

    }
};

exports.add = function (req, res ,next) {
    // 验证
    var newArticle = new Article(req.body.article);

    // console.log(req.body.article);

    // 获取 作者
    var authorId = req.session.userId;
    newArticle.author = authorId;

    async.waterfall([
      function (cb) {
        newArticle.save(function (err, article) {
          if(err){
            return next(err);
          }
          cb(null, article._id);
        });
      },
      function (articleId, cb) {
        Tag.articlePushTag(newArticle.keyWords, articleId, cb);
      }
      ],function (err) {
      if(err){
        res.state(400);
        return next(err);
      }
      res.end({'result':false});
    });

  };

// 更新
exports.edit = function (req, res, next) {
  var editArticle = req.body.article;
  var modifArticle;
  var delTagArr = []; // del keywords
  var addTagArr = []; // append new keywords

  async.waterfall([
      // 获取原始对象
      function  (cb) {
        Article.findById(editArticle._id,cb);

        // get difference keywords
      },function (oriArticle, cb) {
        delTagArr = _.difference(oriArticle.keyWords, editArticle.keyWords);
        addTagArr = _.difference(editArticle.keyWords, oriArticle.keyWords);

        modifArticle = oriArticle;

        cb();
        // 删除 Tag 记录
      },function (cb) {
        if(delTagArr.length === 0){
          return cb();
        }

        Tag.articleUnlinkTag(delTagArr, editArticle._id, cb);

        // 添加新增记录
      },function (cb) {
        if(addTagArr.length === 0){
          return cb();
        }

        Tag.articlePushTag(addTagArr, editArticle._id, cb);

        // 清除多余tag doc
      },function (cb) {
        Tag.removeCountZero(cb);

        // 更新自己
      },function (cb) {
        // save update  外 ref 只要 string 就可以
        _.extend(modifArticle, editArticle);
        modifArticle.save(cb);
      }

    ],function (err) {
      if(err){
        return next(err);
      }
      res.end('edit_ok');
    });

};

// 文章列表
// exports.list = function (req, res, next) {
//   Article.find(function (err, articles) {
//     if(err){
//       return next(err);
//     }
//     res.json(articles);
//     res.end();
//   });
// };


// 单个文章 覆盖公共
exports.getById = function (req, res, next) {
  var _id = req.params.id,
    singleArticle;

    async.waterfall([
      function (cb) {
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
          .exec(cb);
      },
      function( article, cb) {
        singleArticle = article;
        cb();
      }], function (err) {
          if(err){
            return next(err);
          }
          res.json(singleArticle);
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

// 获取 cate 文章
exports.getByCate = function (req, res, next) {
  var cateId = req.params.cateId;

  Article
    .find({cate:cateId})
    .exec(function (err, results) {
      if(err) {
        return next(err);
      }

      res.json(results);
      res.end();
    });
};


/**
 * 添加图片
 */
