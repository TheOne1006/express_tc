'use strict';

var multer = require('multer');
var fs = require('fs');


exports.upload = function (app, config) {
  return app.use(multer({
    onFileUploadStart: function (file) {
      // 特殊路径才能直接上传
      if ( file.mimetype !== 'image/jpeg'){
        return false;
      }
      // if (file.mimetype !== 'image/jpeg') {
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

      if(req.url.indexOf('carousel') !== -1 ) {
        reutrnDest = config.root+'/data/carousel/';
      }
      else if(req.url.indexOf('picture') !== -1) {
        reutrnDest = config.root+'/data/pictures/';
      }

      if(reutrnDest){
        // 创建 carousel 目录
        try {
            stat = fs.statSync(reutrnDest);
        } catch(err) {
            fs.mkdirSync(reutrnDest);
        }
      }
      else
      {
        // 创建 tmp目录
        try {
            stat = fs.statSync(initDest);
        } catch(err) {
            fs.mkdirSync(initDest);
        }
      }

      if (stat && !stat.isDirectory()) {
          throw new Error('Directory cannot be created because an inode of a different type exists at "' + reutrnDest + '"');
      }

      return reutrnDest || initDest;
    }
  }));
};
