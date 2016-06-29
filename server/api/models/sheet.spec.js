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

            expect(sheet.sheets).to.be.an('object');
            expect(sheet.authFactory).to.be.an('object');
        });
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('auth method', () => {
        let authFactoryStub;

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

        it('should exec callback with error if something goes wrong', () => {


            let callback = sandbox.spy();
            sheet.auth(callback);

            let err = new Error('Some error');

            authFactoryStub.getApplicationDefault.callArg(0, err, {});

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Some error');

        });
    });

    describe('getLastModifiedDate method', () => {
        let requestStub;
        let validRes = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        };

        let validBody = {};

        beforeEach(() => {
            requestStub = sandbox.stub();
            sheet.request = requestStub;
        });

        it('should use request', () => {

            sheet.getLastModifiedDate();

            expect(requestStub.called).to.be.true;
        });

        it('should pass err to callback if request returns error', () => {


            let callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            let err = new Error('Connection error');

            sheet.request.callArg(1, err, null);
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.deep.equal(err);
        });


        it('should pass err to callback if response is not json, or status code not equal 200', () => {


            let callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            sheet.request.callArg(1, null, {
                statusCode: 404,
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            });
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Cant get last modified external');

            callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            sheet.request.callArg(1, null, {
                statusCode: 200,
                headers: {
                    'content-type': 'text/html; charset=UTF-8'
                }
            });

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Cant get last modified external');
        });


        it('should pass err to callback if error in parsing JSON', () => {

            let callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            sheet.request.callArg(1, null, validRes, '<html></html>');
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Can\'t parse JSON response');

            callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);


            sheet.request.callArg(1, null, validRes, '!!!');
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Can\'t parse JSON response');
        });

        it('should pass err to callback if there is no lastModified date in response', () => {

            let callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            let body = {
                feed: {}
            };


            sheet.request.callArg(1, null, validRes, JSON.stringify(body));
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Can\'t get last modified in external response');


            callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            body = {
                feed: {
                    updated: {
                        $t: ''
                    }
                }
            };

            sheet.request.callArg(1, null, validRes, JSON.stringify(body));
            expect(callback.calledOnce).to.be.true;

            expect(callback.args[0][0].message).to.equal('Can\'t get last modified in external response');
        });


        it('should pass last modified date if everythimg is ok', () => {

            let callback = sandbox.spy();
            sheet.getLastModifiedDate(callback);

            let date = 'some date';

            let body = {
                feed: {
                    updated: {
                        $t: date
                    }
                }
            };


            sheet.request.callArg(1, null, validRes, JSON.stringify(body));
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.be.null;
            expect(callback.args[0][1]).to.equal(date);

        });
    });
    describe('getData method', () => {
        let authStub;
        let sheetsStub;
        beforeEach(() => {
            authStub = sandbox.stub();

            sheetsStub = {
                spreadsheets: {
                    values: sandbox.stub({
                        get: () => {}
                    })
                }
            };


            sheet.auth = authStub;
            sheet.sheets = sheetsStub;
        });

        it('should use auth method', () => {
            sheet.getData();

            expect(authStub.calledOnce).to.be.true;
        });


        it('should pass auth error to callback', () => {
            let callback = sandbox.spy();
            sheet.getData(callback);

            authStub.callArg(0, new Error('Auth error'));

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('Auth error');
        });


        it('should launch sheets Api method if auth successfull', () => {
            let callback = sandbox.spy();
            sheet.getData(callback);

            authStub.callArg(0, null, {auth: true});

            expect(sheetsStub.spreadsheets.values.get.called).to.be.true;
        });


        it('should pass API error to callback', () => {
            let callback = sandbox.spy();
            sheet.getData(callback);

            authStub.callArg(0, null, {auth: true});
            sheetsStub.spreadsheets.values.get.callArg(1, new Error('Api error'));

            expect(callback.called).to.be.true;
            expect(callback.args[0][0].message).to.equal('Api error');
        });

        it('should pass error to callback if res has no values array', () => {
            let callback = sandbox.spy();
            sheet.getData(callback);

            authStub.callArg(0, null, {auth: true});
            sheetsStub.spreadsheets.values.get.callArg(1, null, {});

            expect(callback.called).to.be.true;
            expect(callback.args[0][0].message).to.equal('No data in sheets Api response');
        });

        it('should pass res values to callback if everything is OK', () => {
            let callback = sandbox.spy();
            let values = ['123', '123', '123'];
            sheet.getData(callback);

            authStub.callArg(0, null, {auth: true});
            sheetsStub.spreadsheets.values.get.callArg(1, null, {
                values: values
            });

            expect(callback.called).to.be.true;
            expect(callback.args[0][0]).to.equal(null);
            expect(callback.args[0][1]).to.equal(values);


            callback = sandbox.spy();
            values = [];
            sheet.getData(callback);

            authStub.callArg(0, null, {auth: true});
            sheetsStub.spreadsheets.values.get.callArg(1, null, {
                values: values
            });

            expect(callback.called).to.be.true;
            expect(callback.args[0][0]).to.equal(null);
            expect(callback.args[0][1]).to.equal(values);
        });
    });

});