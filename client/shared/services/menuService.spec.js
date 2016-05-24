'use strict';
import app from '../../app';

describe('Main menu service', () => {
    let menuService;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject((_menuService_) => {
            menuService = _menuService_;
        });
    });

    it('should have proper default active item', () => {
        expect(menuService.activeItem).to.be.a('string');
        expect(menuService.activeItem).to.equal('/');
    });

    it('should have array of menu items', () => {
        expect(menuService.menuItems).to.be.an('array');
        // expect(menuService.menuItems).to.equal('/');
    });

    describe('getActiveItem() method', () => {
        it('should return actual active menu item', () => {
            expect(menuService.getActiveItem()).to.be.a('string');
            expect(menuService.getActiveItem()).to.equal('/');

            menuService.activeItem = '/about';
            expect(menuService.getActiveItem()).to.equal('/about');
        });
    });

    describe('setActiveItem() method', () => {
        it('should return actual active menu item', () => {
            menuService.setActiveItem('/blablabla');
            expect(menuService.activeItem).to.be.a('string');
            expect(menuService.activeItem).to.equal('/blablabla');

            menuService.setActiveItem('/about');
            expect(menuService.activeItem).to.be.a('string');
            expect(menuService.activeItem).to.equal('/about');
        });
    });
});