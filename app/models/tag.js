/**
 * 标签信息
 * 进度
 * autoSave 可以使用，未做容错，判断，更新和 insert 分离进行，update 未作 处理
 * 
 */
'use strict';

var mongoose = require('mongoose'),
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

  // 静态方法
  TagSchema.static('autoSave',function (tagArray, articleId, cb) {
    var newTagArr = [],
      hasTagArr = [],
      i,j = 0,
      that = this;

      this.find({name:{$in:tagArray}},function (err, doc) {
        if(err){
          return cb(err);
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
                return cb(err);
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
            return cb(err);
          }

          cb();
        });
        
      });



    // this.find({name:{$in:tagArray}},function (err, doc) {
      // if(err){
      //   return cb(err);
      // }

      // for (i in doc) {
      //   hasTagArr.push(doc[i].name);
      // }

      // that.where({name:{'$in':hasTagArr}}).update({'$inc':{count:+1}},function (err, num) {
      //   console.log('影响行数'+num);
      // });

      // for (j; j < tagArray.length; j++) {
      //   if(indexOf(hasTagArr, tagArray[j]) < 0){
      //     newTagArr.push({name:tagArray[j],count:1,arrArticleObjectId:[articleId]});
      //   }
      // }

      // that.create(newTagArr,function (err) {
      //   return cb(err);
      // });
      
    // });
  });

  /**
   * article 取消tag 关联
   * @param  array   tagArray  tag数组
   * @param  string   articleId
   * @param  Function cb
   */
  TagSchema.static('articleUnlinkTag',function (tagArray, articleId, cb) {
    var that = this;

    this.find({name:{$in:tagArray}},function (err, tagArr) {
      if(err){
        return cb(err);
      }
      
    });   
  });



  mongoose.model('Tag',TagSchema);