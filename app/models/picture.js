/**
 * 图片处理
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Mixed = Schema.Types.Mixed,
  moment = require('moment');

// const
var kindArticleStr = 'article';



var PictureSchema = new Schema({
  imgTitle: {type: String, required: true, unique: true},
  kind:{type: String, defult: 'article'},
  imgSrc:{type: String, require:true},
  imgInCloudId: {type: String},
  imgInCloud:{type: Mixed},
  status:{type: Boolean},
  updateTime:{type: String}
});


// pre save setting
PictureSchema.pre('save', function (next) {
    this.updateTime = moment().format('x');

    if(this.status !== false && !this.status) {
        this.status = true;
    }

    if(this.imgInCloud && this.imgInCloud.public_id) {
      this.imgInCloudId = this.imgInCloud.public_id;
    }

    if(!this.kind) {
        this.kind = kindArticleStr;
    }

    next();
});

/**
 * 列表
 */
var OriginOptions = {
  limit : 10,
  page : 1
};

PictureSchema.static('list', function ( options , next) {

 // 前置内容处理
 joinCate  = joinCate || false;
 options = _.extend({}, OriginOptions, options);

 // 变量声明
 var handle;

 handle = this.find();

 handle
   .skip(options.limit * (options.page - 1))
   .limit(options.limit)
   .exec(next);
});





mongoose.model('Picture', PictureSchema);
