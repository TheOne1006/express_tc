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
    cloudinary:Schema.Types.Mixed,
    facePlusPlus:Schema.Types.Mixed,
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

  //静态方法 是否具有创建face++ person 的资格
  AdminphSchema.static('facePlusPower',function (userId, cb) {
    this.findOne({userObjectId:userId,facePlusPlus:{$exists:true,'$ne':null} },function (err,ph) {
      if(err){
        return cb(err);
      }
      if(ph){
        return  cb(null, {hasCreatePower:true});
      }
      return cb(null,{hasCreatePower:false});
    });
  });

  // 静态方法 获取所有可上传的数据
  AdminphSchema.static('facePlusDataReady',function (userId ,cb) {
    this.where({userObjectId:userId, facePlusPlus:{$exists:true,'$ne':null} }).find(cb);
  });

mongoose.model('Adminph',AdminphSchema);