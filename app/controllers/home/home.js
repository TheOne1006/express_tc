'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Article = mongoose.model('Article'),
  Cate = mongoose.model('Cate');

exports.index = function (req, res) {
    res.render('home/index', {
      title: 'Generator-Express MVC',
    });
    res.end();
};

//  文章列表
exports.list = function (req, res, next) {
  var listCate = req.params.cate,
  page = req.params.page,
  pageCount = 15,
  skipNum,
  cateId;

  // init
  listCate = (listCate === undefined)?'all':listCate;
  page = (page === undefined)?1:page;

  skipNum = (page -1 )* pageCount;

  async.waterfall([
    function (cb) {
      if(listCate === 'all') {
        return cb();
      }

      Cate.findByName(listCate, function (err, cate) {
        if(err) {
          return cb(err);
        }
        cateId = cate._id;

        return cb();
      });


    },function (cb) {
      var findParam = {};
      if(cateId) {
        findParam = {cate:cateId};
      }

      Article
        .find(findParam)
        .sort({updateTime:-1})
        .populate('cate','name')
        .skip(skipNum)
        .limit(pageCount)
        .exec(cb);
    }

    ],function (err, results) {
      if(err) {
        return next(err);
      }
      res.json(results);
      res.end();
    });
};

exports.cateList = function (req, res, next) {
  var maxLimit = 20;
  Cate
    .find()
    .sort({articleNum:1})
    .limit(maxLimit)
    .exec(function (err, results) {
      if(err){
        return next(err);
      }
      res.json(results);
      res.end();
    });
};

// 首页列表
exports.indexList = function  (req, res, next) {
  var maxLimit = 20;
  Cate
    .find()
    .populate('topArticles')
    .sort({weight:-1})
    .limit(maxLimit)
    .exec(function (err, results) {
      if(err) {
        return next(err);
      }
      res.json(results);
      res.end();
    });
};