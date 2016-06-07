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

    describe('nameFilter', () => {
        it('should filter single name', () => {
            let result = $filter('nameFilter')('John');
            expect(result).to.be.a.string;
            expect(result).to.equal('John<br />');

            result = $filter('nameFilter')('John Dow\n');
            expect(result).to.be.a.string;
            expect(result).to.equal('John Dow<br />');

            result = $filter('nameFilter')('John Dow,');
            expect(result).to.be.a.string;
            expect(result).to.equal('John Dow<br />');
        });

        it('should filter string of many names, separated by newline and comma, not a whitespace!', () => {
            let input = 'John Dow\nMia Melone, Amy Vinehouse';
            let result = $filter('nameFilter')(input);
            let shouldEqual = 'John Dow<br />Mia Melone<br /> Amy Vinehouse<br />';
            expect(result).to.be.a.string;
            expect(result).to.equal(shouldEqual);

            input = 'Jonny, Emma Rose, Алексей Константин\n,';
            shouldEqual = 'Jonny<br /> Emma Rose<br /> Алексей Константин<br />';
            result = $filter('nameFilter')(input);
            expect(result).to.be.a.string;
            expect(result).to.equal(shouldEqual);


        });

        it('should return input if input is false', () => {
            let result = $filter('nameFilter')('');
            expect(result).to.be.a.string;
            expect(result).to.equal('');


            result = $filter('nameFilter')(false);
            expect(result).to.be.a.boolean;
            expect(result).to.equal(false);

            result = $filter('nameFilter')(0);
            expect(result).to.be.a.number;
            expect(result).to.equal(0);

        });
    });



});