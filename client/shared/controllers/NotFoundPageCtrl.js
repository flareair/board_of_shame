'use strict';

export default class NotFoundPageCtrl {
    constructor(metaDataService, menuService) {
        this.title = '404 Not found';
        metaDataService.setPageTitle(this.title);
        // menuService.setActiveItem('/');
    }
}

NotFoundPageCtrl.$inject = ['metaDataService', 'menuService'];