'use strict';

export default class MainMenuCtrl {
    constructor(menuService) {
        this.menuService = menuService;
        this.menuItems = menuService.menuItems;
    }

    isActive(url) {
        // need to improve
        return this.menuService.getActiveItem() === url ? 'active' : '';
    }
}

MainMenuCtrl.$inject = ['menuService'];