'use strict';
const path = require('path');


exports.renderPartial = (req, res, next) => {
    let partialName = req.params.name;
    res.render('pages/views/partials/' + partialName);
};