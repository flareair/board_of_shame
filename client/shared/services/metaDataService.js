'use strict';

export default class metaDataService {
    constructor() {
        this.pageTitle = '';
    }

    getPageTitle() {
        return this.pageTitle;
    }

    setPageTitle(newTitle) {
        this.pageTitle = newTitle;
    }
}