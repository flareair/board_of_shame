'use strict';

import './main.less';


import 'file!./favicon.ico';
import 'file!./favicon-32.ico';
import 'file!./favicon-152.png';

// 123

import angular from 'angular';
import ngRouter from 'angular-route';
import ngSanitize from 'angular-sanitize';
import angulartics from 'angulartics';
import ga from 'angulartics-google-analytics';


import shared from './shared/sharedModule';
import pages from './pages/pagesModule';
import board from './board/boardModule';


export default angular.module('app', [
    ngRouter,
    ngSanitize,
    angulartics,
    ga,
    shared,
    pages,
    board
]).name;
