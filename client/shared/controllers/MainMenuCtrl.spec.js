'use strict';
import app from '../../app';

describe('MainMenu controller', () => {
    let MainMenuCtrl;
    let stubMenuService;
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        angular.mock.module(app);
        angular.mock.inject(($controller) => {
            stubMenuService = sandbox.stub({
                getActiveItem: () => {}
            });
            MainMenuCtrl = $controller('MainMenuCtrl', {
                menuService: stubMenuService
            });
        });
    });

    afterEach(function() {
      // Cleanup the sandbox to remove all the stubs
      sandbox.restore();
    });

    describe('isActive() method', () => {
        it('should use MenuService', () => {
            MainMenuCtrl.isActive();

            expect(stubMenuService.getActiveItem.calledOnce).to.be.true;
        });

        it ('should return "active" class if input value equal current active menu item', () => {
            stubMenuService.getActiveItem.returns('/');
            expect(MainMenuCtrl.isActive('/')).to.equal('active');

            stubMenuService.getActiveItem.returns('/about');
            expect(MainMenuCtrl.isActive('/about')).to.equal('active');
        });


        it ('should return empty string if input value equal current active menu item', () => {
            stubMenuService.getActiveItem.returns('/');
            expect(MainMenuCtrl.isActive('blabla')).to.be.empty;

            stubMenuService.getActiveItem.returns('/about');
            expect(MainMenuCtrl.isActive(123123123)).to.equal('');
        });
    });


});