/**
 * 标签信息
 * 进度
 * 分离进行，update 未作 处理
 * 
 */
'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  moment = require('moment');

// tool function 工具函数
var indexOf = function( list, elem ) {
  var i = 0,
    len = list.length;
  for ( ; i < len; i++ ) {
    if ( list[i] === elem ) {
      return i;
    }
  }
  return -1;
};

// 定义标签 数据模型
/**
 * Q 异步出现问题
 * name 标签名称
 * count 文章出现次数
 * articles 出现文章的ids []
 */
var TagSchema = new Schema({
  name:{type: String, required: true, unique: true},
  count:{type:Number, default:1},
  arrArticleObjectId:[{type: ObjectId, ref:'Article'}],
  updateTime:{type:String}
});

  TagSchema.pre('save',function (next) {

    if(!this.updateTime){
      this.updateTime = moment().format('x');
    }

    next();

  });


  /**
   * article 增加tag 关联
   * @param  array   tagArray  tag数组
   * @param  string   articleId
   * @param  Function cb
   */
  TagSchema.static('articlePushTag',function (tagArray, articleId, next) {
    var newTagArr = [],
    hasTagArr = [],
    j = 0,
    that = this;

    // 查找存在 tags
    this.find({name:{$in:tagArray}},function (err, resultArr) {
        if(err){
          return next(err);
        }

        hasTagArr = _.map(resultArr, function (item) {
          return item.name;
        });

        async.parallel([
          // 更新 原来的 tag
          function (cb) {
            if(hasTagArr.length === 0){
              return cb();
            }

            //Q: 能否 没有 直接创建 ?
            //mongoose 批量更新，设置参数,multi:true
            // 没有则创建 upsert:true
            that.update({name:{'$in':hasTagArr}},
              {
                '$set':{updateTime:moment().format('x')},
                '$inc':{count:1},
                '$push':{arrArticleObjectId:articleId}
              },
              {
                multi:true
              },
              function (err) {
                if(err){
                  return cb(err);
                }
                cb();
              });

            // 更新 新加入的 tag
          },function (cb) {
            // _.map 可能会更好
            for (j; j < tagArray.length; j++) {
              if(indexOf(hasTagArr, tagArray[j]) < 0){
                newTagArr.push({name:tagArray[j],count:1,arrArticleObjectId:[articleId],updateTime:moment().format('x')});
              }
            }

            that.create(newTagArr,function (err) {
              if(err){
                return cb(err);
              }

              cb();
            });

          }],function (err) {
          if(err){
            return  next(err);
          }
          next();
        });


      });

  });


  // 静态方法
  // 准备废弃
  TagSchema.static('autoSave',function (tagArray, articleId, next) {
    var newTagArr = [],
      hasTagArr = [],
      i,j = 0,
      that = this;

      this.find({name:{$in:tagArray}},function (err, doc) {
        if(err){
          return next(err);
        }

        for (i in doc) {
          hasTagArr.push(doc[i].name);
        }

        if(hasTagArr.length > 0){
          //mongoose 批量更新，设置参数,multi:true
          // 没有则创建 upsert:true
          that.update({name:{'$in':hasTagArr}},
            {
              '$set':{updateTime:moment().format('x')},
              '$inc':{count:1},
              '$push':{arrArticleObjectId:articleId}
            },
            {
              multi:true
            },
            function (err) {
              if(err){
                return next(err);
              }
            });
        }


        for (j; j < tagArray.length; j++) {
          if(indexOf(hasTagArr, tagArray[j]) < 0){
            newTagArr.push({name:tagArray[j],count:1,arrArticleObjectId:[articleId],updateTime:moment().format('x')});
          }
        }

        that.create(newTagArr,function (err) {
          if(err){
            return next(err);
          }

          next();
        });
        
      });

  });

  /**
   * article 取消tag 关联
   * @param  array   tagArray  tag数组
   * @param  string   articleId
   * @param  Function cb
   * 不删除 count 为零的 文档*
   */
  TagSchema.static('articleUnlinkTag',function (tagArray, articleId, next) {
    if(tagArray.length === 0){
      return next();
    }
    // var self = this;

    this.update({name:{'$in':tagArray}},
      {
        '$set':{updateTime:moment().format('x')},
        '$inc':{count:-1},
        // 更新删除 array 字段总的元素
        '$pull':{arrArticleObjectId:articleId}
      },
      {
        multi:true
      },
      function (err) {
        if(err){
          return next(err);
        }
        next();
      });

  });

  /**
   * remove count 0 doc
   */
  TagSchema.static('removeCountZero', function (next) {

    this.remove({count:0},function (err) {
        if(err){
          return next(err);
        }
        next();
    });
  });



  mongoose.model('Tag',TagSchema);