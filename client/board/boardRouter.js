'use strict';

pagesRouter.$inject = ['$routeProvider'];

export default function pagesRouter($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/partials/board.html',
            controller: 'BoardCtrl',
            controllerAs: 'board',
        });
}