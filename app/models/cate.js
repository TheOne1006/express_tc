/**
 * 博客类别信息
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// 定义 数据模型骨架
var CateSchema = new Schema({
  type:String,
  name:String,
  pid:Number,
  path:String,
  'article_num':Number,
  updatetime:String
});



mongoose.model('Cate',CateSchema);