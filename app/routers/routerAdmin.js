'use strict';
/**
 * 后台router
 */
var express = require('express'),
  adminLoginR = express.Router(),
  adminR = express.Router(),
  articleR = express.Router(),
  cateR = express.Router(),
  userR = express.Router();

// 加载 控制器
var adminLoginCtrl = require('../controllers/admin/login');
var adminCtrl = require('../controllers/admin/admin');
var articleCtrl = require('../controllers/admin/article');
var cateCtrl = require('../controllers/admin/cate');
var userCtrl = require('../controllers/admin/user');



  module.exports = function (app) {
    // 后台
    app.use('/admin',adminR);
    adminR.use(adminCtrl.checkSession);
    adminR.get('/', adminCtrl.index);    

    // 后台登录
    app.use('/admin/login', adminLoginR);
    adminLoginR.get('/', adminLoginCtrl.index);
    adminLoginR.post('/verify/password', adminLoginCtrl.verify.password);
    adminLoginR.post('/verify/face', adminLoginCtrl.verify.face);

    // 后台文章
    app.use('/admin/article', articleR);
    articleR.put('/add', articleCtrl.add);

    // 后台文章类别
    app.use('/admin/cate', cateR);
    cateR.get('/', cateCtrl.list);
    cateR.get('/all', cateCtrl.allList);
    cateR.put('/add', cateCtrl.add);
    cateR.get('/id/:id', cateCtrl.getById);
    cateR.delete('/id/:id', cateCtrl.delById);

    // 后台管理员
    app.use('/admin/user', userR);
    userR.get('/', userCtrl.index);
    userR.get('/myInfo', userCtrl.myInfo);

    //face++
    userR.get('/createFacePower', userCtrl.face.createPower);
    userR.get('/createfacePerson', userCtrl.face.createPerson);
    userR.get('/updatefacePerson', userCtrl.face.updatePerson);
    userR.get('/up2facePP:/id', userCtrl.face.upload);
    userR.get('/faceSingle/:_id', userCtrl.face.removeById);

    userR.get('/myPhotoList', userCtrl.myPhotoList);
    userR.post('/addUserPhotos', userCtrl.addMyPhotos);
    // cloudinary
    userR.post('/up2cloud/:id', userCtrl.cloudinary.upload);
    userR.delete('/cloudSingle/:_id',userCtrl.cloudinary.removeById);


  };