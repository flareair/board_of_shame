'use strict';
import app from '../../app';

describe('NotFound controller', () => {
    let NotFoundPageCtrl;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject(($controller) => {
            NotFoundPageCtrl = $controller('NotFoundPageCtrl');
        });
    });

    it('should have right title', () => {
        NotFoundPageCtrl.should.exist;
        NotFoundPageCtrl.title.should.be.a('string');
        NotFoundPageCtrl.title.should.equal('404 Not found');
    });
});