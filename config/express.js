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

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use('/data',express.static(config.root + '/data'));
  app.use('/angular',express.static(config.root+ '/angular'));
  app.use(methodOverride());

  // 文件上传 中间件
  app.use(multer({
    onFileUploadStart: function (file, req) {
      // 特殊路径才能直接上传
      // if (req.url !=='/admin/login/verify/face'){
      //   return false;
      // }
      return true;
    },
    // dest: config.root+'/data/tmp/',
    // inMemory: true //放入 buffer 中, 不存入文件
    rename: function () {
      return Date.now()+ Math.floor(Math.random()*1000);
    },
    changeDest: function(dest, req) {
      var stat = null,
      reutrnDest = null,
      initDest = config.root+'/data/tmp/';

      if(req.url.indexOf('carousel') !== -1 ){
        reutrnDest = config.root+'/data/carousel/';
      }

      if(reutrnDest){
        try {
            stat = fs.statSync(reutrnDest);
        } catch(err) {
            fs.mkdirSync(reutrnDest);
        }
      }

      if (stat && !stat.isDirectory()) {
          throw new Error('Directory cannot be created because an inode of a different type exists at "' + reutrnDest + '"');
      }

      return reutrnDest || initDest;
    }
  }));
  
    // session
  app.use(session({
       secret: 'theone12138',
       // secure 关闭安全 secure
       // HTTPS这货对于secure cookies是必须的
       cookie:{maxAge:1800000,secure: false},
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
