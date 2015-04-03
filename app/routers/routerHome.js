'use strict';
/**
 * 前台router
 */
// 加载 控制器
var homeCtrl = require('../controllers/home/home');
var articleCtrl = require('../controllers/article');


module.exports = function (app) {
  app.get('/',homeCtrl.index);

  // 文章列表
  app.get('/article/list', articleCtrl.list);
  app.get('/article/id/:id',articleCtrl.getById);


};