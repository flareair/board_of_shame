'use strict';

export default class boardService {
    constructor($http)  {
        this.$http = $http;
        // basic twitch api url
        this.url = '/api/scammers/all';
    }

    getAllScammers() {
        return this.$http.get(this.url);
    }
}

boardService.$inject = ['$http'];