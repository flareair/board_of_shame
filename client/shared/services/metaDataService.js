'use strict';

export default class metaDataService {
    constructor($location) {
        this.pageTitle = '';
        this.address = `http://${$location.host()}/`;
    }

    getPageTitle() {
        return this.pageTitle;
    }

    setPageTitle(newTitle) {
        this.pageTitle = newTitle;
    }
}

metaDataService.$inject = ['$location'];