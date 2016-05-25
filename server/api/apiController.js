'use strict';

const SheetModel = require('./models/sheet');
const BlackList = require('./models/blackList');
const MetaData = require('./models/metaData');
const Scammer = require('./models/scammer');


let sheet = new SheetModel({
    sheetId: '12k92qZdkAvnff38qMY8P0U8F1UVWjE0sxhEnEGDfLd8',
    begin: 'B9',
    end: 'E5000',
});

let blackList = new BlackList(sheet, MetaData, Scammer);


exports.defaultInfo = (req, res, next) => {
    res.end('Welcome to GAS Club Board Of Shame api');
};

exports.getAll = (req, res, next) => {
    blackList.getAllScammers((err, scammers) => {
        if (err) {
            // mongoose.connection.close();
            return next(err);
        }

        return res.json(scammers);
    });
};

exports.notFound = (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
};