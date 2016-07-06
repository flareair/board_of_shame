'use strict';
import app from '../../app';

describe('Loading service', () => {
    let loadingService;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject((_loadingService_) => {
            loadingService = _loadingService_;
        });
    });

    it('should have false isViewLoading prop on init', () => {
        expect(loadingService.isViewLoading).to.be.a('boolean');
        expect(loadingService.isViewLoading).to.equal(false);
    });
});