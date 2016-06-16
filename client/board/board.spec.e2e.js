'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Board page (desktop)', () => {

    let searchField = {};

    before(() => {
        browser.driver.manage().window().setSize(1280, 768);
    });

    beforeEach(() => {
        browser.get('/');
    });

    describe('static content', () => {
        it('should have right page title', () => {
            expect(browser.getTitle()).to.eventually.equal('BoardOfShame Список мошенников');
        });

        it('should have right h1 caption', () => {
            expect(element(by.css('.board-caption')).getText()).to.eventually.equal('Поиск');
        });

        it('should have right active menu item', () => {
            expect(element(by.css('.navbar .active')).getText()).to.eventually.equal('Список');
        });
    });


    describe('board body', () => {
        it('should contain 11 board items (test table)', () => {
            expect(element.all(by.css('.board-item')).count()).to.eventually.equal(11);
        });
    });

    describe('board footer info', () => {
        it('should contain right info about items', () => {
            expect(element(by.css('.board-footer')).getText()).to.eventually.equal('Всего найдено: 11');
        });
    });

    describe('board search filter', () => {

        beforeEach(() => {
            searchField = element(by.css('.input-lg'));
        });

        it('should filter one scammer correctly', () => {
            searchField.sendKeys('Михаил Кукурузов');

            expect(element.all(by.css('.board-item')).count()).to.eventually.equal(1);
            expect(element.all(by.css('.board-item')).get(0).getText()).to.eventually.contain('Михаил Кукурузов');
            expect(element(by.css('.board-footer')).getText()).to.eventually.equal('Всего найдено: 1');
        });

        it('should filter group of scammers correctly', () => {
            searchField.sendKeys('оракл');

            expect(element.all(by.css('.board-item')).count()).to.eventually.equal(6);
            expect(element.all(by.css('.board-item')).get(5).getText()).to.eventually.contain('Китайские подделки');
            expect(element(by.css('.board-footer')).getText()).to.eventually.equal('Всего найдено: 6');
        });

        it('should display right message if nothing was found', () => {
            searchField.sendKeys('zzzzblablaba');

            expect(element.all(by.css('.board-item')).count()).to.eventually.equal(0);

            expect(element(by.css('.board-footer')).getText()).to.eventually.equal('Ничего не найдено');
        });
    });

});