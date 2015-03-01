/**
 * 管理员
 * 身份照片
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('underscore'),
  moment = require('moment');

  //定义图片模型
  var AdminphSchema = new Schema({
    path:{type:String, require:true, unique:true},
    userObjectId:{type:Schema.Types.ObjectId,require:true},
    addTime:{type:String}
  });

  AdminphSchema.pre('save',function (next) {
    if(!this.addTime){
      this.addTime = moment().format('x');
    }
    next();
  });

  // 静态方法
  AdminphSchema.static('arraySave',function (phArray, userId, cb) {
    var adminPhotosArr = [];
    if(!phArray || !userId){
      return cb('parameter undefined');
    }

    _.each(phArray,function (item) {
      adminPhotosArr.push({
        path:item,
        userObjectId:userId,
        addTime:moment().format('x')
      });
    });

    this.create(adminPhotosArr,function  (err) {
      if(err){
        return cb(err);
      }
      cb();
    });
  });

mongoose.model('Adminph',AdminphSchema);