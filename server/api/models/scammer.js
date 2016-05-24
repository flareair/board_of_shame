'use strict';

const mongoose = require('mongoose');

let scammerSchema = mongoose.Schema({
    name: {type: String, trim: true},
    href: {type: String, trim: true},
    description: {type: String, trim: true},
    complaintFrom: {type: String, trim: true},
});

module.exports = mongoose.model('Scammer', scammerSchema);


