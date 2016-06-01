'use strict';

export default function nameFilter() {
    return function(input) {
        if (!input) {
            return input;
        }

        let names = input.replace( /[\n,]/g, '#/').split('#/').filter(Boolean);

        let output = names.reduce((prev, current) => {
            return prev + `${current}<br />`;
        }, '');
        return output;
    };
}