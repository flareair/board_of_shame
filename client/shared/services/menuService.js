'use strict';

export default class menuService {
    constructor() {
        this.activeItem = '/';
        this.menuItems = [
            {
                link: '/',
                name: 'Board',
            },
            {
                link: '/about',
                name: 'About',
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