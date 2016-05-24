'use strict';

export default class RootCtrl {
    constructor(metaDataService) {
        this.metaData = metaDataService;
    }
}

RootCtrl.$inject = ['metaDataService'];