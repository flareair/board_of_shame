'use strict';

import './main.less';

import angular from 'angular';
import ngRouter from 'angular-route';
import ngSanitize from 'angular-sanitize';

import shared from './shared/sharedModule';
import pages from './pages/pagesModule';
import board from './board/boardModule';


export default angular.module('app', [
    ngRouter,
    ngSanitize,
    shared,
    pages,
    board
]).name;
