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
        this.boardService.getAllScammers()
            .then((res) => {
                this.scammers = res.data;
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.error(err.statusText);
            });
    }
}

BoardCtrl.$inject = ['metaDataService', 'menuService', 'boardService'];