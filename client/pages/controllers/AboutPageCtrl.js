'use strict';

export default class AboutPageCtrl {
    constructor(metaDataService,menuService) {
        this.title = 'Oб этом проекте';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/about');
    }
}

AboutPageCtrl.$inject = ['metaDataService', 'menuService'];