/**
 * 博客类别信息
 * @author theone 
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  _ = require('underscore'),
  moment = require('moment');

// 定义 数据模型骨架
var CateSchema = new Schema({
  name:{type: String, required: true, unique: true},
  alias:{type: String, required:true},
  // 为什么 ObjectId 不行
  // 尝试方法，硬编码 写入 objectId
  pid:{type: String, ref:'Cate'},
  weight:{type: Number, default:0},
  topArticles:[{type: ObjectId, ref:'Article'}],
  articleNum:Number,
  updateTime:String
});
  
CateSchema.pre('save',function (next) {
  if(!this.articleNum){
    this.articleNum = 0;
  }

  if(this.alias && _.isString(this.alias)) {
    this.alias = this.alias.toLowerCase();
  }

  this.updateTime = moment().format('x');

  next();
});


/**
 * 查找Id,以及pid的相关信息
 * @param  string   id  cate._id for string
 * @param  function cb
 *
 */
CateSchema.static('findByIdAndParent',function (id, cb) {
  var self = this;
  this
    .findById(id)
    .exec(function (err, cate) {
      if(err){
        return cb(err);
      }
      // 查找pid是否存在
      if(!cate.pid || cate.pid === ''){
        return cb(null, cate);
      }

      // 继续查找pid
      self
        .findById(cate.pid)
        .select('name')
        .exec(function (err, pcate) {
          if(err){
            return cb(err);
          }
          cate.pid = pcate.name;
          cb(null, cate);
        });
    });
});

/**
 * 搜索ByName
 */
 CateSchema.static('findByName',function (name, cb) {
    var nameReg = new RegExp('^'+name+'$', 'i');

   this
     .findOne({name:nameReg})
     .exec(function (err, cate) {
       if(err){
         return cb(err);
       }

      return cb(null, cate);
     });
 });


 /**
  * 搜索ByAlias
  */
  CateSchema.static('findByAlias',function (alias, cb) {

    this
      .findOne({alias:alias})
      .exec(function (err, cate) {
        if(err){
          return cb(err);
        }

       return cb(null, cate);
      });
  });





mongoose.model('Cate',CateSchema);