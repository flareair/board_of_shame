'use strict';

import angular from 'angular';
import ngRouter from 'angular-route';

import pagesRouter from './pagesRouter';


import boardService from './services/boardService';

import BoardCtrl from './controllers/BoardCtrl';
import AboutPageCtrl from './controllers/AboutPageCtrl';

export default angular.module('app.pages', [ngRouter])
    .config(pagesRouter)
    .service('boardService', boardService)
    .controller('BoardCtrl' ,BoardCtrl)
    .controller('AboutPageCtrl' ,AboutPageCtrl)
    .name;