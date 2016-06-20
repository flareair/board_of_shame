'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const util = require('util');

chai.use(chaiAsPromised);
let expect = chai.expect;

const SheetModel = require('./sheet');
const sheetConf = require('../../config/sheet.js');



describe('Sheet model', () => {
    let sheet;
    let sandbox;
    let authFactoryStub;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sheet = new SheetModel(sheetConf);
    });

    describe('constructor method', () => {
        it('should init model with right props', () => {
            expect(sheet.options).to.be.an('object');

            expect(sheet.scope).to.be.an('array');
            expect(sheet.scope.length).to.be.above(0);
            expect(sheet.oldApiUrl).to.be.a('string');

            expect(sheet.google).to.be.an('object');
            expect(sheet.authFactory).to.be.an('object');
        });
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('auth method', () => {
        beforeEach(() => {
            authFactoryStub = sandbox.stub({
                getApplicationDefault: (callback) => {
                }
            });

            sheet.authFactory = authFactoryStub;
        });
        it('should use authFactory', () => {

            sheet.auth();

            expect(authFactoryStub.getApplicationDefault.called).to.be.true;
        });

        it('should launch callback without errors and pass authClient to it if everything is ok', () => {

            let callback = sandbox.spy();
            let authClient = {
                auth: 'auth'
            };

            sheet.auth(callback);
            authFactoryStub.getApplicationDefault.callArg(0, null, authClient);

            expect(callback.called).to.be.true;
            expect(callback.args[0][0]).to.be.a('null');
            expect(callback.args[0][1]).to.deep.equal(authClient);

        });

        it('should console.error error log if something goes wrong', () => {

            sandbox.spy(console, 'error');
            sheet.auth(sandbox.spy());

            let err = new Error('Some error');

            authFactoryStub.getApplicationDefault.callArg(0, err, {});
            expect(console.error.calledOnce).to.be.true;
            expect(console.error.args[0][1]).to.deep.equal(err);

        });

        it('should exec callback with error if something goes wrong', () => {


            let callback = sandbox.spy();
            sheet.auth(callback);

            let err = new Error('Some error');

            authFactoryStub.getApplicationDefault.callArg(0, err, {});

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.deep.equal(err);

        });
    });

    describe('getLastModifiedDate method', () => {

    });

    describe('getData method', () => {

    });

});