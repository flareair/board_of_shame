'use strict';

const mongoose = require('mongoose');

let MetaDataSchema = mongoose.Schema({
    lastUpdated: {type: Date},
    lastPending: {type: Date},
}, {collection: 'metadata'});


MetaDataSchema.statics.init = function init(cb) {
    return this.create({
        lastUpdated: new Date(1000),
        lastPending: new Date(1000)
    }, cb);
};


MetaDataSchema.statics.get = function get(cb) {
    return this.findOne({}, cb);
};

MetaDataSchema.statics.updateMeta = function updateMeta(newData, cb) {
    this.update({}, newData, cb);
};

module.exports = mongoose.model('MetaData', MetaDataSchema);


