/**
 * 用户登录
 * 功能 登录验证
 * 
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  moment = require('moment');

  // 定义用户模型
  var UserSchema = new Schema({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    lastLoginTime:{type:String,default:'0'},
    loginTime:{type:String,default:'0'},
    updateTime:{type:String}
  });

    UserSchema.pre('save',function (next) {
        if(!this.updateTime){
          this.updateTime = moment().format('x');
        }

        next();
    });

mongoose.model('User', UserSchema);