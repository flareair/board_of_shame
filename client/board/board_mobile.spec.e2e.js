'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Board page (mobile)', () => {

    before(() => {
        browser.driver.manage().window().setSize(400, 800);
    });

    beforeEach(() => {
        browser.get('/');
    });

    describe('mobile content', () => {
        it('should have right page title', () => {
            expect(browser.getTitle()).to.eventually.equal('BoardOfShame Список мошенников');
        });

        it('should have invisible h1 \'Search\' caption', () => {
            expect(element(by.css('.board-caption')).isDisplayed()).to.eventually.be.false;
        });

        it('should have invisible board header', () => {
            expect(element(by.css('.board-header')).isDisplayed()).to.eventually.be.false;
        });

        it('should have visible menu toggle button', () => {
            expect(element(by.css('.navbar-toggle')).isDisplayed()).to.eventually.be.true;
        });

        it('should have visible mobile labels', () => {
            expect(element.all(by.css('.mobile-labels')).get(0).isDisplayed()).to.eventually.be.true;
        });
    });


});