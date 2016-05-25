'use strict';


exports.renderPartial = (req, res, next) => {
    let partialName = req.params.name;
    res.render('board/views/partials/' + partialName);
};