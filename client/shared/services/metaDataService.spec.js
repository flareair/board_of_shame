'use strict';
import app from '../../app';

describe('MetaData service', () => {
    let metaDataService;

    beforeEach(() => {
        angular.mock.module(app);
        angular.mock.inject((_metaDataService_) => {
            metaDataService = _metaDataService_;
        });
    });

    it('should have proper default page title', () => {
        expect(metaDataService.pageTitle).to.be.a('string');
        expect(metaDataService.pageTitle).to.equal('default');
    });

    describe('getPageTitle() method', () => {
        it('should return current pageTitle', () => {
            expect(metaDataService.getPageTitle()).to.equal('default');
            metaDataService.pageTitle = 'blablabla';
            expect(metaDataService.getPageTitle()).to.equal('blablabla');
        });
    });

    describe('setPageTitle() method', () => {
        it('should set pageTitle of service', () => {
            metaDataService.setPageTitle('blablabla');
            expect(metaDataService.pageTitle).to.equal('blablabla');
            metaDataService.setPageTitle('Page title');
            expect(metaDataService.pageTitle).to.equal('Page title');
        });
    });
});