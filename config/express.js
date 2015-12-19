'use strict';
var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);

var multer = require('multer');
var fs = require('fs');


module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  app.use(compress());

  // 开发模式下使用，生产环境下ngnix 配置
  if(app.get('env') === 'development'){
    app.use(logger('dev'));
    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.static(config.root + '/public'));
    app.use('/public',express.static(config.root + '/public'));
    app.use('/data',express.static(config.root + '/data'));
    app.use('/angular',express.static(config.root+ '/angular'));
  }

  app.use(methodOverride());

  // 判断reffer,执行重定向 (是否可以移动到 /app/routes/routerHome.js ?)
  app.use(function(req, res, next){
    var urlArr = req.url.split('/'),
    argUrlPart = urlArr[1] || '',
    needRedirect = false;

    if(argUrlPart === 'article' || argUrlPart === 'cate' || argUrlPart === 'search') {
      needRedirect = true;
    }


    if(needRedirect) {
        console.log('log-- redierct');
        res.redirect('/#'+req.url);
        return;
    }

    next();
  });

  // 文件上传 中间件
  //
  // app.use(multer({
  //   onFileUploadStart: function (file, req) {
  //     // 特殊路径才能直接上传
  //     if (req.url !=='/admin/login/verify/face' && file.mimetype !== 'image/jpeg'){
  //       return false;
  //     }
  //     // if (file.mimetype !== 'image/jpeg') {
  //     //   return false;
  //     // }
  //     return true;
  //   },
  //   // dest: config.root+'/data/tmp/',
  //   // inMemory: true //放入 buffer 中, 不存入文件
  //   rename: function () {
  //     return Date.now()+ Math.floor(Math.random()*1000);
  //   },
  //   changeDest: function(dest, req) {
  //     var stat = null,
  //     reutrnDest = null,
  //     initDest = config.root+'/data/tmp/';

  //     if(req.url.indexOf('carousel') !== -1 ){
  //       reutrnDest = config.root+'/data/carousel/';
  //     }

  //     if(reutrnDest){
  //       // 创建 carousel 目录
  //       try {
  //           stat = fs.statSync(reutrnDest);
  //       } catch(err) {
  //           fs.mkdirSync(reutrnDest);
  //       }
  //     }
  //     else
  //     {
  //       // 创建 tmp目录
  //       try {
  //           stat = fs.statSync(initDest);
  //       } catch(err) {
  //           fs.mkdirSync(initDest);
  //       }
  //     }

  //     if (stat && !stat.isDirectory()) {
  //         throw new Error('Directory cannot be created because an inode of a different type exists at "' + reutrnDest + '"');
  //     }

  //     return reutrnDest || initDest;
  //   }
  // }));


    // session
  app.use(session({
       secret: 'theone12138',
       // secure 关闭安全 secure
       // HTTPS这货对于secure cookies是必须的
       // 60*1000 1min
       cookie:{maxAge:60 * 60 * 1000, secure: false},
       rolling: true,
       saveUninitialized:true,
       resave: true,
        store: new MongoStore({
          url : config.db
        })
  }));

  // 加载所有 controllers
   var routers = glob.sync(config.root + '/app/routers/*.js');
  //var controllers = glob.sync(config.root + '/app/controllers/*.js');

  // 单独提出 router
  routers.forEach(function (router) {
    require(router)(app, config);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    mongoose.set('debug', config.debug);
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
