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

function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g,''); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g,''); //去除多余空行
  str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
  return str;
  }


var ArticleSchema = new Schema({
  title: {type: String, required: true, unique: true},
  author:{type: ObjectId, required: true, ref: 'User'},
  cate:{type: ObjectId, required: true, ref: 'Cate'},
  keyWords:{type: Array, default:[]},
  contentText:{type:String},
  content:{type:String, required:true},
  updateTime:{type:String}
  });

// ［obj, obj1, obj2] = > ['str',['str1'],['str2']]
ArticleSchema.static('keyword2arr',keyword2arr);

ArticleSchema.pre('save',function (next) {

  if(!this.updateTime){
    this.updateTime = moment().format('x');
  }

  this.contentText = removeHTMLTag(this.content);
  next();
});

mongoose.model('Article', ArticleSchema);

