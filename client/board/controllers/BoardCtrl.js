'use strict';

export default class BoardCtrl {
    constructor(metaDataService, menuService, boardService) {
        this.title = 'BoardOfShame Список мошенников';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/');

        this.boardService = boardService;

        this.scammers = [];
        this.loading = false;

        this.activate();

        this.search = '';
    }

    activate() {
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
}

BoardCtrl.$inject = ['metaDataService', 'menuService', 'boardService'];