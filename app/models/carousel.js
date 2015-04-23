/**
 * 首页滚动carousel
 */
'use strict';

var mongoose = require('mongoose'),
    Schema= mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    moment = require('moment');

var IndexKind = 1;

/**
 * Carousel Schema build
 */
var CarouselSchma = new Schema({
    imgTitle: {type: String, require: true, unique: true},
    positionKind:{type: Number, require:true, defult:1},
    imgSrc:{type: String, require:true},
    imgInColud:{type: Mixed},
    imgDesc:{type: String},
    imgInfo:{type: Mixed},
    updateTime:{type: String}
});

// pre save setting
CarouselSchma.pre('save', function (next) {
    this.updateTime = moment().format('x');

    if(!this.positionKind) {
        this.positionKind = IndexKind;
    }

    next();
});

mongoose.model('Carousel', CarouselSchma);