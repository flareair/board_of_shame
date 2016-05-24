'use strict';

export default function mainMenu() {
    return {
        restrict: 'E',
        templateUrl: 'shared/partials/directives/mainmenu.html',
        controller: 'MainMenuCtrl',
        controllerAs: 'menu'
    };
}