'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    var newart = new Article({title:'first_one'});
    newart.save(function (err) {
      if(err){
          console.log(err);
        }
    });

    Article.find({_id:'54d6113ae4b04aad9bbdc7fa'},function(err,docs){  
             console.log(docs.blog);  
             console.log('11111');
      });

    Article.find(function (err, articles) {
    if (err){
      return next(err);
    }
    
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
