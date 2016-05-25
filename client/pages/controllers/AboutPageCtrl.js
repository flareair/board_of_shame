'use strict';

export default class AboutPageCtrl {
    constructor(metaDataService,menuService) {
        this.title = 'About this project';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/about');
    }
}

AboutPageCtrl.$inject = ['metaDataService', 'menuService'];