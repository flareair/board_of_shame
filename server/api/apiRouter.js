'use strict';

const express = require('express');
let router = express.Router();

const apiController = require('./apiController');

/*
    Mount point /
*/


router.get('/', apiController.defaultInfo);
router.get('/scammers/all', apiController.getAll);
router.get('*', apiController.notFound);

module.exports = router;
