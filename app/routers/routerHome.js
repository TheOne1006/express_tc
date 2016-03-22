'use strict';
/**
 * 前台router
 */
// 加载 控制器
var controller = require('../controllers/home');
var homeCtrl = controller.home;
var articleCtrl = controller.article;
var searchCtrl = controller.search;
var carouselCtrl = controller.carousel;


module.exports = function (app, config) {

  app.get('/', function (req, res){
    res.sendFile(config.root + '/angular/views/home/index.html');
    res.end();
  });

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

  app.get('/api/articlesByCateAlias/:alias',articleCtrl.getListByCate);
  app.get('/api/cate/articlesCount/:cateId', articleCtrl.getCountByCateId );

  app.get('/api/search/articles/:searchWord', searchCtrl.goAngthing);

  app.get('/api/carousels', carouselCtrl.getList);
  app.get('/api/cates/all', homeCtrl.cateList);
};
