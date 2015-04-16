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

// sessionMongodbUrl

var multer = require('multer');

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
      if (req.url !=='/admin/login/verify/face'){
        return false;
      }
    },
    dest: config.root+'/data/tmp/',
    inMemory: true //放入 buffer 中, 不存入文件
  }));
  
    // session
  app.use(session({
       secret: 'theone12138',
       // secure 关闭安全 secure
       // HTTPS这货对于secure cookies是必须的
       cookie:{maxAge:1800000,secure: false},
       saveUninitialized:true,
       resave: true,
  }));

  // 加载所有 controllers
   var routers = glob.sync(config.root + '/app/routers/*.js');
  //var controllers = glob.sync(config.root + '/app/controllers/*.js');

  // 单独提出 router
  routers.forEach(function (router) {
    require(router)(app);
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
