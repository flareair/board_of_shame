'use strict';

export default class BoardCtrl {
    constructor(metaDataService, menuService, boardService) {
        this.title = 'BoardOfShame';
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
                // console.log(res.data[0]);
                this.scammers = res.data;
            });
    }
}

BoardCtrl.$inject = ['metaDataService', 'menuService', 'boardService'];