/**
 * 标签信息
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  moment = require('moment');

// 定义标签 数据模型
/**
 * name 标签名称
 * count 文章出现次数
 * articles 出现文章的ids []
 */
var TagSchema = new Schema({
  name:{type: String, required: true, unique: true},
  count:{type:Number, default:0},
  arrArticleObjectId:[Schema.Types.ObjectId],
  updateTime:{type:String, defaut:moment().format('x')}
});

  // 静态方法
  TagSchema.static('autoSave',function (tagArray, cb) {
    var newTagArr = [];
    this.find({name:{$in:tagArray}},function (err, doc) {
      console.log(doc);
    });
  });


  mongoose.model('Tag',TagSchema);