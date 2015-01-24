'use strict';

var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/admin/login', function (req, res) {
    res.render('admin/login', {
      title: 'Generator-Express MVC'
    });
});
