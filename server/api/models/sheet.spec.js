'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
let expect = chai.expect;

const SheetModel = require('./sheet');
const sheetConf = require('../../config/sheet.js');



describe('Sheet model', () => {
    let sheet;

    beforeEach(() => {
        sheet = new SheetModel(sheetConf);
    });

    describe('constructor', () => {
        it('should init model with right props', () => {
            expect(sheet.options).to.be.an.object;
        });
    });

});