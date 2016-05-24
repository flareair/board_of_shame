'use strict';

export default class MainPageCtrl {
    constructor(metaDataService, menuService) {
        this.title = 'Main page';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/');
    }
}

MainPageCtrl.$inject = ['metaDataService', 'menuService'];