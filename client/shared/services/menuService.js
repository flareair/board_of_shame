'use strict';

export default class menuService {
    constructor() {
        this.activeItem = '';
        this.menuItems = [
            {
                link: '/',
                name: 'Список',
            },
            {
                link: '/about',
                name: 'FAQ',
            },
        ];
    }

    getActiveItem() {
        return this.activeItem;
    }

    setActiveItem(newActiveItem) {
        this.activeItem = newActiveItem;
    }
}