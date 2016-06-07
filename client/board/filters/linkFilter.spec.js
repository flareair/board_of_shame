'use strict';
import app from '../../app';

describe('Link filter', () => {
    let sandbox;
    let $filter;


    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        angular.mock.module(app);
        angular.mock.inject((_$filter_) => {
            $filter = _$filter_;
        });
    });


    afterEach(function() {
        sandbox.restore();
    });

    describe('linkFilter', () => {
        it('should filter single href', () => {
            let result = $filter('linkFilter')('abs \n,');
            expect(result).to.be.a.string;
            expect(result).to.equal('<a href="abs" target="_blank">abs</a><br />');

            result = $filter('linkFilter')('http://www.google.com/voice?123123');
            expect(result).to.be.a.string;
            expect(result).to.equal('<a href="http://www.google.com/voice?123123" target="_blank">http://www.google.com/voice?123123</a><br />');
            result = $filter('linkFilter')('http://www.google.com/voice?123123');
            expect(result).to.be.a.string;
            expect(result).to.equal('<a href="http://www.google.com/voice?123123" target="_blank">http://www.google.com/voice?123123</a><br />');
        });

        it('should filter string of many hrefs, separated by newline, comma or whitespace', () => {
            let input = 'abc\ngoogle.com,http://www.zara.com/';
            let result = $filter('linkFilter')(input);
            let shouldEqual = '<a href="abc" target="_blank">abc</a><br /><a href="google.com" target="_blank">google.com</a><br /><a href="http://www.zara.com/" target="_blank">http://www.zara.com/</a><br />';
            expect(result).to.be.a.string;
            expect(result).to.equal(shouldEqual);

            input = 'abc google.com http://www.zara.com/';
            result = $filter('linkFilter')(input);
            expect(result).to.be.a.string;
            expect(result).to.equal(shouldEqual);


        });

        it('should return input if input is false', () => {
            let result = $filter('linkFilter')('');
            expect(result).to.be.a.string;
            expect(result).to.equal('');


            result = $filter('linkFilter')(false);
            expect(result).to.be.a.boolean;
            expect(result).to.equal(false);

            result = $filter('linkFilter')(0);
            expect(result).to.be.a.number;
            expect(result).to.equal(0);

        });
    });



});