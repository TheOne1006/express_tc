/**
 * 
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  moment = require('moment');

/* 工具方法 keyword2arr */
var keyword2arr = function (kWordArr) {
    var arr = [],i = 0;
    for(i in kWordArr){
      arr[i] = kWordArr[i].text;
    }
    return arr;
};


var ArticleSchema = new Schema({
  title: {type: String, required: true, unique: true},
  cate:{type: ObjectId, required: true, ref:'Cate'},
  keyWords:{type: Array, default:[]},
  content:{type:String, required:true},
  updateTime:{type:String}
  });

// ［obj, obj1, obj2] = > ['str',['str1'],['str2']]
ArticleSchema.static('keyword2arr',keyword2arr);

ArticleSchema.pre('save',function (next) {

  if(!this.updateTime){
    this.updateTime = moment().format('x');
  }

  next();
});

mongoose.model('Article', ArticleSchema);

