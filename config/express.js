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

// var multer = require('multer');
// var fs = require('fs');

module.exports = function(app, config) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  // if(app.get('env') === 'production') {
    // prerender
   // app.use(require('prerender-node').set('prerenderServiceUrl', config.prerenderUrl));
  // }

  app.use(compress());

  // 开发模式下使用，生产环境下ngnix 配置
  if(app.get('env') === 'development') {
    app.use(logger('dev'));
    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.static(config.root + '/public'));
    app.use('/public',express.static(config.root + '/public'));
    app.use('/data',express.static(config.root + '/data'));
    app.use('/angular',express.static(config.root+ '/angular'));
  }

  app.use(methodOverride());

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

  if(app.get('env') === 'development') {

    app.use('/admin',function (req, res, next) {
      res.sendFile(config.root + '/angular/views/admin/index.html', {}, function (err) {
        if(err) {
          return next(err)
        }
        res.end();
      });
    });

    app.use('/', function (req, res, next) {
      res.sendFile(config.root + '/angular/views/home/index.html', {}, function (err) {
        if(err) {
          return next(err)
        }
        res.end();
      });
    });

  }



  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  mongoose.set('debug', config.debug);


  app.use(function (err, req, res) {
    if(err) {
      res.status(err.status || 500);
      res.json(err);
    }
    res.end();
  });

};
