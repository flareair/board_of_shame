'use strict';

boardRouter.$inject = ['$routeProvider'];

export default function boardRouter($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/board/partials/board.html',
            controller: 'BoardCtrl',
            controllerAs: 'board',
        });
}