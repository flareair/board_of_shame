'use strict';

const express = require('express');
let router = express.Router();

const apiController = require('./apiController');

/*
    Mount point /
*/


router.get('/', apiController.defaultInfo);
router.get('/scammers/all', apiController.getAll);

module.exports = router;
