'use strict';

import angular from 'angular';
import ngRouter from 'angular-route';

import boardRouter from './boardRouter';


import boardService from './services/boardService';

import BoardCtrl from './controllers/BoardCtrl';

export default angular.module('app.pages', [ngRouter])
    .config(boardRouter)
    .service('boardService', boardService)
    .controller('BoardCtrl' ,BoardCtrl)
    .name;