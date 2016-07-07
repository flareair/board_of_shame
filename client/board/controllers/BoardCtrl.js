'use strict';

export default class BoardCtrl {
    constructor($location, metaDataService, menuService, boardService) {
        this.title = 'BoardOfShame Список мошенников';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/');

        this.$location = $location;
        this.boardService = boardService;

        this.scammers = [];
        this.loading = false;

        this.activate();

    }

    activate() {
        this.search = this.getSearchQuery();


        this.loading = true;
        return this.boardService.getAllScammers()
            .then((res) => {
                this.scammers = res.data;
                return this.scammers;
            })
            .catch((err) => {
                console.error(err.statusText);
                return false;
            })
            .finally(() => {
                this.loading = false;
            });
    }

    changeQuery() {
        this.$location.search('search', this.search);
    }

    getSearchQuery() {
        let query = this.$location.search();

        console.log(query);

        if (query.hasOwnProperty('search') && query.search !== true) {
            return query.search;
        }

        return '';
    }
}

BoardCtrl.$inject = ['$location', 'metaDataService', 'menuService', 'boardService'];