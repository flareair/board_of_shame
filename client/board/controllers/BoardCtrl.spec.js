'use strict';
import app from '../../app';

describe('Board controller', () => {
    // let BoardCtrl;
    let stubBoardService;
    let sandbox;
    let deferred;
    let BoardCtrl;
    let $scope;
    let res = {
        data: [
            {
                name: 'test',
                href: 'test.com',
                description: 'Lorem ipsum',
                complaintFrom: 'test2.com',
            }
        ]
    };


    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        angular.mock.module(app);
        angular.mock.inject(($controller, $q, _$rootScope_) => {
            deferred = $q.defer();
            stubBoardService = sandbox.stub({
                getAllScammers: () => {
                }
            });

            stubBoardService.getAllScammers.returns(deferred.promise);

            $scope = _$rootScope_.$new();

            BoardCtrl = $controller('BoardCtrl', {
                boardService: stubBoardService,
            });
        });
    });




    afterEach(function() {
        sandbox.restore();
    });

    it('should have right title', () => {
        expect(BoardCtrl).to.be.an('object');
        expect(BoardCtrl.title).to.be.a('string');
        expect(BoardCtrl.title).to.equal('BoardOfShame Список мошенников');
    });

    describe('activate() method', () => {
        it('should use BoardService', (done) => {

            BoardCtrl.activate().then((data) => {
                expect(data).to.deep.equal(res.data);
                done();
            });

            deferred.resolve(res);
            $scope.$apply();

        });

        it('should return scammers data if promise successful', (done) => {

            BoardCtrl.activate().then((data) => {
                expect(data).to.deep.equal(res.data);
                done();
            });

            deferred.resolve(res);
            $scope.$apply();
        });

        it('should return false data if promise rejected', (done) => {

            BoardCtrl.activate().then((data) => {
                expect(data).to.be.false;
                done();
            });

            deferred.reject(res);
            $scope.$apply();
        });

        it('should call console.error if promise rejected', (done) => {

            sandbox.spy(console, 'error');

            BoardCtrl.activate().then((data) => {
                expect(console.error.called).to.be.true;
                done();
            });

            deferred.reject(res);
            $scope.$apply();
        });

        it('should set loading variable to true while promise is pending', () => {

            deferred.resolve(res);
            BoardCtrl.activate();
            return expect(BoardCtrl.loading).to.be.true;
        });

        it('should set loading variable to false then promise is completed', (done) => {
            BoardCtrl.activate().then((data) => {
                expect(BoardCtrl.loading).to.be.false;
                done();
            });

            deferred.resolve(res);
            $scope.$apply();
        });
    });

});