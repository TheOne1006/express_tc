/**
 * article 控制器 管理员权限
 */
'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Article = mongoose.model('Article'),
  _ = require('underscore'),
  publicArticle = require('../article');


  _.extend(exports, publicArticle);


exports.allList = function (req, res, next) {

  var limit = req.query.limit || req.body.limit || 10,
    page = req.query.page || req.body.page || 1,
    keyword = req.query.keyword || req.body.keyword || '',
    cate = req.query.cate || req.body.cate || '',
    options = {
      limit: limit,
      page: page,
      keyword: keyword,
      cate: cate
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
  var _id = req.param('id');

  if(editArticle._id) {
    delete editArticle._id;
  }


  Article
    .update({_id: _id}, {$set: editArticle}, function (err, result) {
      if(err) {
        return next(err)
      }
      res.json({result:'ok'})
      res.end();
    })

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
    res.json({result:'ok'});
    res.end();
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
