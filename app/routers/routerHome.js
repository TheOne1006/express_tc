'use strict';
/**
 * 前台router
 */
// 加载 控制器
var homeCtrl = require('../controllers/home/home');
var articleCtrl = require('../controllers/article');
var searchCtrl = require('../controllers/search');
var carouselCtrl = require('../controllers/carousel.js');


module.exports = function (app) {
  app.get('/',homeCtrl.index);

  app.get(['/home/list/:cate([a-zA-Z0-9]+)/:page([0-9]+)',
    '/home/list',
    ], homeCtrl.list);
  app.get('/home/index/list', homeCtrl.indexList);
  app.get('/home/cate/index', homeCtrl.cateList);

  // 文章列表
  // app.get('/h/article/list', articleCtrl.list);
  app.get('/h/article/id/:id', articleCtrl.getById);
  app.get('/h/article/cate/:alias/:page', articleCtrl.getListByCate );
  app.get('/h/article/total/cate/:alias', articleCtrl.getCountByCate );

  app.get('/h/search/:searchWord', searchCtrl.goAngthing);

  // 首页carouselCtrl
  app.get('/carousel/index/list', carouselCtrl.Indexlist);

  /**
   * api restful
   */
  app.get('/api/articles/:cateId', articleCtrl.getArticlesByCateId);
  app.get('/api/article/:articleId',articleCtrl.getArticleById);

  app.get('/api/carousels', carouselCtrl.getList);
};
