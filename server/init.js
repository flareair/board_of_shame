'use strict';

const mongoose = require('mongoose');
const MetaData = require('./api/models/metaData');

let config = require('./config/db');


mongoose.connect(`mongodb://${config.addr}/blacklist:${config.port}`);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

MetaData.remove({}, function(err) {
   console.log('collection removed');
    MetaData.init((err, data) => {
        if (err) {
            console.log(err);
        }
        mongoose.connection.close();
    });
});


