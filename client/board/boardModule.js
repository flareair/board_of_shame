'use strict';

import angular from 'angular';
import ngRouter from 'angular-route';

import boardRouter from './boardRouter';


import boardService from './services/boardService';

import linkFilter from './filters/linkFilter';
import nameFilter from './filters/nameFilter';

console.log(nameFilter);

import BoardCtrl from './controllers/BoardCtrl';

export default angular.module('app.board', [ngRouter])
    .config(boardRouter)
    .filter('linkFilter', linkFilter)
    .filter('nameFilter', nameFilter)
    .service('boardService', boardService)
    .controller('BoardCtrl' ,BoardCtrl)
    .name;