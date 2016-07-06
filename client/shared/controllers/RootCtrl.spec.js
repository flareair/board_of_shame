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

    it('should have right loading property', () => {
        RootCtrl.loading.should.exist;
        RootCtrl.loading.should.be.an('object');
    });
});