'use strict';

import angular from 'angular';
import ngRouter from 'angular-route';

import sharedRouter from './sharedRouter';

import metaDataService from './services/metaDataService';
import menuService from './services/menuService';
import loadingService from './services/loadingService';

import RootCtrl from './controllers/RootCtrl';
import MainMenuCtrl from './controllers/MainMenuCtrl';
import NotFoundPageCtrl from './controllers/NotFoundPageCtrl';

import mainMenu from './directives/mainMenuDirective';
import siteFooter from './directives/siteFooterDirective';
import socialButtons from './directives/socialButtonsDirective';
import viewLoading from './directives/viewLoadingDirective';

export default angular.module('app.shared', [ngRouter])
    .config(sharedRouter)
    .service('metaDataService', metaDataService)
    .service('menuService', menuService)
    .service('loadingService', loadingService)
    .controller('RootCtrl', RootCtrl)
    .controller('MainMenuCtrl', MainMenuCtrl)
    .controller('NotFoundPageCtrl', NotFoundPageCtrl)
    .directive('mainMenu', mainMenu)
    .directive('siteFooter', siteFooter)
    .directive('socialButtons', socialButtons)
    .directive('viewLoading', viewLoading)
    .name;