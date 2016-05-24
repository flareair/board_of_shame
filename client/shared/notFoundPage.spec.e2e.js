'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Angular blog 404 page', () => {

    beforeEach(() => {
        browser.get('/blablabla/123');
    });

    it('should have right page title', () => {
        expect(browser.getTitle()).to.eventually.equal('404 Not found');
    });

    it('should have right h1 caption', () => {
        expect(element(by.tagName('h1')).getText()).to.eventually.equal('Ooops, we can\'t find this page');
    });
});