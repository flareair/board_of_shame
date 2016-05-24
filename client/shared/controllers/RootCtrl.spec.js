'use strict';
import app from '../../app';

describe('Root controller', () => {
    let RootCtrl;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject(($controller) => {
            RootCtrl = $controller('RootCtrl');
        });
    });

    it('should have right metadata property', () => {
        RootCtrl.metaData.should.exist;
        RootCtrl.metaData.should.be.an('object');
    });
});