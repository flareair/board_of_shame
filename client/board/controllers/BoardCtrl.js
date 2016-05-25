'use strict';

export default class BoardCtrl {
    constructor(metaDataService, menuService, boardService) {
        this.title = 'BoardOfShame Список мошенников';
        metaDataService.setPageTitle(this.title);
        menuService.setActiveItem('/');

        this.boardService = boardService;

        this.scammers = [];

        this.activate();
        this.search = '';
    }

    activate() {
        this.boardService.getAllScammers()
            .then((res) => {
                this.scammers = res.data;
            })
            .catch((err) => {
                console.error(err.statusText);
            });
    }
}

BoardCtrl.$inject = ['metaDataService', 'menuService', 'boardService'];