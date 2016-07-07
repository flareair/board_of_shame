'use strict';
import app from '../../app';

describe('Board controller', () => {
    // let BoardCtrl;
    let stubBoardService;
    let stubMetaDataService;
    let stubMenuService;
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
    let pageTitle = 'BoardOfShame Список мошенников';


    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        angular.mock.module(app);
        angular.mock.inject(($controller, $q, _$rootScope_, _$location_) => {
            deferred = $q.defer();

            stubBoardService = sandbox.stub({
                getAllScammers: () => {
                }
            });

            stubBoardService.getAllScammers.returns(deferred.promise);


            stubMetaDataService = sandbox.stub({
                setPageTitle: () => {
                }
            });

            stubMenuService = sandbox.stub({
                setActiveItem: () => {
                }
            });

            $scope = _$rootScope_.$new();

            BoardCtrl = $controller('BoardCtrl', {
                $location: _$location_,
                metaDataService: stubMetaDataService,
                menuService: stubMenuService,
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
        expect(BoardCtrl.title).to.equal(pageTitle);
    });


    it('should use menuService and send proper args to it', (done) => {

        BoardCtrl.activate();
        expect(stubMenuService.setActiveItem.calledWith('/')).to.be.true;
        done();

    });

    it('should use metaDataService and send proper args to it', (done) => {

        BoardCtrl.activate();
        expect(stubMetaDataService.setPageTitle.calledWith(pageTitle)).to.be.true;
        done();

    });

    describe('activate() method', () => {
        it('should launch getSearchQuery method', () => {
            sinon.spy(BoardCtrl, 'getSearchQuery');

            BoardCtrl.activate();

            expect(BoardCtrl.getSearchQuery.calledOnce).to.be.true;
        });

        it('should use boardService', (done) => {

            BoardCtrl.activate();
            expect(stubBoardService.getAllScammers.called).to.be.true;
            done();

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

    describe('changeQuery method', () => {

        it('should use $location.search() method', () => {
            sinon.spy(BoardCtrl.$location, 'search');

            BoardCtrl.changeQuery();
            expect(BoardCtrl.$location.search.calledOnce).to.be.true;
        });

        it('should change query string then board.search is changing', () => {
            BoardCtrl.search = 'Search';
            BoardCtrl.changeQuery();
            expect(BoardCtrl.$location.search()).to.be.an('object');
            expect(BoardCtrl.$location.search().search).to.equal('Search');

            BoardCtrl.search = 'search///+=12312 string';
            BoardCtrl.changeQuery();
            expect(BoardCtrl.$location.search()).to.be.an('object');
            expect(BoardCtrl.$location.search().search).to.equal('search///+=12312 string');
        });
    });

    describe('getSearchQuery method', () => {

        beforeEach(() => {
            BoardCtrl.$location = sinon.stub({
                search: () => {}
            });
        });

        it('should use $location.search() method', () => {
            // sinon.spy(BoardCtrl.$location, 'search');
            BoardCtrl.$location.search.returns({});
            BoardCtrl.getSearchQuery();
            expect(BoardCtrl.$location.search.calledOnce).to.be.true;
        });


        it('should return search query as plain readable text if it is valid', () => {
            // sinon.spy(BoardCtrl.$location, 'search');

            BoardCtrl.$location.search.returns({search: '123123'});

            expect(BoardCtrl.getSearchQuery()).to.be.a('string');
            expect(BoardCtrl.getSearchQuery()).to.equal('123123');
        });

        it('should return emty string if search query param is empty', () => {
            // sinon.spy(BoardCtrl.$location, 'search');

            BoardCtrl.$location.search.returns({search: true});

            expect(BoardCtrl.getSearchQuery()).to.be.a('string');
            expect(BoardCtrl.getSearchQuery()).to.equal('');

            BoardCtrl.$location.search.returns({});

            expect(BoardCtrl.getSearchQuery()).to.be.a('string');
            expect(BoardCtrl.getSearchQuery()).to.equal('');
        });
    });

});