'use strict';

export default class BoardCtrl {
    constructor(metaDataService, menuService) {
        this.title = 'BoardOfShame';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/');
    }
}

BoardCtrl.$inject = ['metaDataService', 'menuService'];