'use strict';
import app from '../../app';

describe('viewLoading directive', () => {
    let viewLoading, scope, compile, sandbox, stubLoadingService;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        stubLoadingService = sandbox.stub({
                isViewLoading: false
        });

        angular.mock.module(app, $provide => {
            $provide.value('loadingService', stubLoadingService);
        });

        angular.mock.inject((_$compile_, _$rootScope_) => {
            compile = _$compile_;
            scope = _$rootScope_.$new();
        });

        viewLoading = getCompiledElement();



        function getCompiledElement(){
            let element = angular.element('<view-loading></view-loading>');
            let compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('link function', () => {
        it('should allow loadingService.isViewLoading to be false before any view loads', () => {
            expect(stubLoadingService.isViewLoading).to.be.false;
        });

        it('should change loadingService.isViewLoading to true then view start to load', () => {
            scope.$emit('$routeChangeStart');
            expect(stubLoadingService.isViewLoading).to.be.true;
        });

        it('should change loadingService.isViewLoading to false then view succesfully load', () => {
            scope.$emit('$routeChangeSuccess');
            expect(stubLoadingService.isViewLoading).to.be.false;
        });
    });
});