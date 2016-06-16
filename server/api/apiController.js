'use strict';

const SheetModel = require('./models/sheet');
const BlackList = require('./models/blackList');
const MetaData = require('./models/metaData');
const Scammer = require('./models/scammer');

const sheetConf = require('../config/sheet.js');

let sheet = new SheetModel(sheetConf);

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