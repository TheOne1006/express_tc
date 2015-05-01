'use strict';
/**
 * 首页滚动carousel
 */

var mongoose = require('mongoose'),
    Schema= mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    moment = require('moment');
    
// const
var IndexKind = 1,
  useStatus = true;

/**
 * Carousel Schema build
 */
var CarouselSchma = new Schema({
    imgTitle: {type: String, require: true, unique: true},
    positionKind:{type: Number, require:true, defult:1},
    imgSrc:{type: String, require:true},
    imgInCloud:{type: Mixed},
    status:{type: Boolean},
    imgDesc:{type: String},
    imgInfo:{type: Mixed},
    updateTime:{type: String}
});

// pre save setting
CarouselSchma.pre('save', function (next) {
    this.updateTime = moment().format('x');

    if(this.status !== false && !this.status) {
        this.status = useStatus;
    }

    if(!this.positionKind) {
        this.positionKind = IndexKind;
    }

    next();
});

mongoose.model('Carousel', CarouselSchma);