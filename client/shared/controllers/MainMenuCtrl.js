'use strict';

export default class MainMenuCtrl {
    constructor(menuService) {
        this.menuService = menuService;
        this.menuItems = menuService.menuItems;
        this.isCollapsed = false;
    }

    isActive(url) {
        // need to improve
        return this.menuService.getActiveItem() === url ? 'active' : '';
    }

    toggle() {
        this.isCollapsed = !this.isCollapsed;
    }

    followLink() {
        this.isCollapsed = false;
    }
}

MainMenuCtrl.$inject = ['menuService'];