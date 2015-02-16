/**
 * 博客类别信息
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// 定义 数据模型骨架
var CateSchema = new Schema({
  type:{type: String, required: true, unique: true},
  name:String,
  pid:Number,
  path:String,
  articleNum:Number,
  updatetime:String
});
  
CateSchema.pre('save',function (next) {
  if(!this.pid){
    this.pid = 0;
  }

  if(!this.pid){
    this.pid = '0';
  }

  if(!this.articleNum){
    this.articleNum = 0;
  }

  if(!this.updatetime){
    this.updatetime = (new Date()).toString();
  }

  next();
});



mongoose.model('Cate',CateSchema);