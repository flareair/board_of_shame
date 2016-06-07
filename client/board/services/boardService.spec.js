'use strict';
import app from '../../app';

describe('Board service', () => {
    let sandbox;
    let $httpBackend;
    let boardService;
    let allScammersUrl = '/api/scammers/all';


    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        angular.mock.module(app);
        angular.mock.inject((_boardService_, _$httpBackend_) => {
            boardService = _boardService_;
            $httpBackend = _$httpBackend_;

            // stub request to partial
            $httpBackend
                .when('GET', '/board/partials/board.html')
                .respond(200);
            $httpBackend
                .when('GET', allScammersUrl)
                .respond(200);
        });
    });


    afterEach(function() {
        sandbox.restore();
    });

    it('should have API url ${allScammersUrl}', () => {
        expect(boardService.url).to.equal(allScammersUrl);
    });


    describe('getAllScammers() method', (done) => {
        it('should make request to API url', () => {

            $httpBackend.expectGET(allScammersUrl);

            boardService.getAllScammers();
            $httpBackend.flush();
        });
    });



});