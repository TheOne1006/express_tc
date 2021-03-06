/**
 * article
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  _ = require('underscore'),
  // Mixed = Schema.Types.Mixed,
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
  type:{type: String, default:'html'},
  thumbnail:{type: String},
  keyWords:{type: Array, default:[]},
  descript:{type: String, default:''},
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

  if(!this.type) {
    this.type = 'html';
  }

  this.contentText = removeHTMLTag(this.content);
  next();
});

var OriginOptions = {
  limit : 10,
  page : 1,
  keyword : ''
};

ArticleSchema.static('list', function ( options, joinCate , next) {

  // 前置内容处理
  joinCate  = joinCate || false;
  options = _.extend({}, OriginOptions, options);

  // 变量声明
  var regObj,
    findObj = {},
    skip = options.limit * (options.page - 1),
    articleHanle;

  if(options.keyword) {
    regObj = new RegExp(options.keyword);
  }

  if(options.cate) {
    findObj.cate = options.cate;
  }


  articleHanle = this.find(findObj);

  if(options.keyword) {
    articleHanle
      .or([{title:{$regex:regObj,$options: 'i'}},
          {contentText:{$regex:regObj,$options: 'i'}},
          {keyWords: options.keyword},
          ]
        );
  }

  if(skip > 0 ) {
    articleHanle
      .skip(skip);
  }

  articleHanle
    .limit(options.limit);

  if(joinCate) {
    articleHanle
      .populate('cate','name');
  }

  articleHanle
    .exec( next );

});















mongoose.model('Article', ArticleSchema);
