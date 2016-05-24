'use strict';
import app from '../../app';

describe('AboutPage controller', () => {
    let AboutPageCtrl;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject(($controller) => {
            AboutPageCtrl = $controller('AboutPageCtrl');
        });
    });

    it('should have right title', () => {
        AboutPageCtrl.should.exist;
        AboutPageCtrl.title.should.be.a('string');
        AboutPageCtrl.title.should.equal('About page');
    });
});