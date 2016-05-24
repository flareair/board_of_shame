'use strict';

pagesRouter.$inject = ['$routeProvider'];

export default function pagesRouter($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/partials/mainpage.html',
            controller: 'MainPageCtrl',
            controllerAs: 'mainpage',
        })
        .when('/about', {
            templateUrl: '/pages/partials/about.html',
            controller: 'AboutPageCtrl',
            controllerAs: 'aboutpage',
        });
}