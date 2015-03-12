'use strict';

// var mongoose = require('mongoose');
  // Article = mongoose.model('Article');

exports.index = function (req, res) {
  console.log('111');
    res.render('home/index', {
      title: 'Generator-Express MVC',
    });
    res.end();
};
