'use strict';

const express = require('express');
let router = express.Router();

const boardController = require('./boardController');

/*
    Mount point /pages
*/

router.get('/partials/:name', boardController.renderPartial);


module.exports = router;
