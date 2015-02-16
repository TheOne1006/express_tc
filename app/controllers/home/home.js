'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    // var newart = new Article({title:'first_one'});
    // newart.save(function (err) {
    //   if(err){
    //       console.log(err);
    //     }
    // });


    Article.findById('54d613fdd973168e10674567',function(err,docs){  
             if(err){
              console.log(err);
             }
             console.log(docs);

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
