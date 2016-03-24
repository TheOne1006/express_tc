'use strict';
/**
 * 后台router
 */
var controllers = require('../controllers/admin');

// 上传图片中间件
var uploadMiddle = require('../middleware/upload');


// 加载 控制器
var adminLoginCtrl = controllers.login;
var adminCtrl = controllers.admin;
var articleCtrl = controllers.article;
var cateCtrl = controllers.cate;
var userCtrl = controllers.user;
var carouselCtrl = controllers.carousel;
var pictureCtrl = controllers.picture;


  module.exports = function (app, config) {
    // 中间件
    uploadMiddle.upload(app, config);

    // 后台登录
    app.get('/admin/login', adminLoginCtrl.index);
    app.post('/admin/login/verify/password', adminLoginCtrl.verify.password);
    app.post('/admin/login/verify/face', adminLoginCtrl.verify.face);

    // 后台
    app.use('/admin',adminCtrl.checkSession);
    app.get('/admin', function (req, res, next) {
      res.sendFile(config.root + '/angular/views/admin/index.html', {}, function (err) {
        if(err) {
          return next(err)
        }
        res.end();
      });
    });

    // 后台文章
    app.put('/admin/article/add', articleCtrl.add);
    app.post('/admin/article/edit', articleCtrl.edit);

    // 兼容上版本
    app.get('/admin/article/list', articleCtrl.list);
    app.post('/admin/article/list', articleCtrl.list);
    app.get('/admin/article/id/:id', articleCtrl.getById);
    app.delete('/admin/article/id/:id', articleCtrl.delById);
    app.get('/admin/article/cate/:cateId', articleCtrl.getByCate);

    // // 后台文章类别
    app.get('/admin/cate/', cateCtrl.list);
    app.get('/admin/cate/all', cateCtrl.allList);
    app.put('/admin/cate/add', cateCtrl.add);
    app.post('/admin/cate/edit/id/:id', cateCtrl.editById);
    app.get('/admin/cate/id/:id', cateCtrl.getById);
    app.delete('/admin/cate/id/:id', cateCtrl.delById);


    // 后台Carousel
    app.put('/admin/carousel/add', carouselCtrl.add);
    app.get('/admin/carousel/list', carouselCtrl.list);
    app.get('/admin/carousel/changStatus/:id',carouselCtrl.changStatusById);
    app.get('/admin/carousel/delClould/:id',carouselCtrl.cloud.deleteById);
    app.get('/admin/carousel/upClould/:id',carouselCtrl.cloud.uploadById);
    app.get('/admin/carousel/single/:id', carouselCtrl.singleById);
    app.delete('/admin/carousel/del/:id', carouselCtrl.removeById);
    app.post('/admin/carousel/edit/:id', carouselCtrl.updateById);

    // 后台图片管理
    app.put('/admin/picture/add',pictureCtrl.add);
    app.get('/admin/pictures', pictureCtrl.list);
    app.get('/admin/picture/upClould/:_id', pictureCtrl.cloud.uploadById);
    app.delete('/admin/picture/upClould/:_id', pictureCtrl.cloud.deleteById);

    // 后台管理员
    app.get('/admin/user/', userCtrl.index);
    app.get('/admin/user/myInfo', userCtrl.myInfo);

    //face++
    app.get('/admin/user/createFacePower', userCtrl.face.createPower);
    app.get('/admin/user/createfacePerson', userCtrl.face.createPerson);
    app.get('/admin/user/updatefacePerson', userCtrl.face.updatePerson);
    app.get('/admin/user/up2facePP/:_id', userCtrl.face.upload);
    app.get('/admin/user/faceSingle/:_id', userCtrl.face.removeById);

    app.get('/admin/user/myPhotoList', userCtrl.myPhotoList);
    app.post('/admin/user/addUserPhotos', userCtrl.addMyPhotos);
    // cloudinary
    app.get('/admin/user/up2cloud/:id', userCtrl.cloudinary.upload);
    app.delete('/admin/user/cloudSingle/:_id',userCtrl.cloudinary.removeById);


    // URL RESRful
    // api 方便扩展
    app.put('/admin/api/article', articleCtrl.add);
    app.get('/admin/api/article/:id', articleCtrl.getById);
    app.post('/admin/api/article/:id', articleCtrl.edit);
    app.delete('/admin/api/article/:id', articleCtrl.delById);

    app.get('/admin/api/articles', articleCtrl.allList);
    app.get('/admin/api/articles/:cateId', articleCtrl.getByCate);


    app.get('/admin/api/cates', cateCtrl.allList);

    app.put('/admin/api/cate', cateCtrl.add);
    app.get('/admin/api/cate/:id', cateCtrl.getById);
    app.post('/admin/api/cate/:id', cateCtrl.editById);
    app.delete('/admin/api/cate/:id', cateCtrl.delById);

    app.get('/admin/api/pictures', pictureCtrl.list);

  };
