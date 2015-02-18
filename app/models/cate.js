/**
 * 博客类别信息
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  moment = require('moment');

// 定义 数据模型骨架
var CateSchema = new Schema({
  type:{type: String, required: true, unique: true},
  name:{type: String, required: true, unique: true},
  pType:String,
  path:String,
  articleNum:Number,
  updatetime:String
});
  
CateSchema.pre('save',function (next) {
  //小写
  this.type = this.type.toLowerCase();

  //补全
  if(!this.pType){
    this.pType = '';
  }

  if(!this.articleNum){
    this.articleNum = 0;
  }

  if(!this.updatetime){
    this.updatetime = moment().format('x');
  }

  next();
});



mongoose.model('Cate',CateSchema);