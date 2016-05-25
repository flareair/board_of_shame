'use strict';

pagesRouter.$inject = ['$routeProvider'];

export default function pagesRouter($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/board/partials/board.html',
            controller: 'BoardCtrl',
            controllerAs: 'board',
        });
}