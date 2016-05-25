'use strict';

export default function linkFilter() {
    return function(input) {
        if (!input) {
            return input;
        }

        let links = input.replace( /\n/g, ' ').split(' ').filter(Boolean);

        let output = links.reduce((prev, current) => {
            return prev + `<a href="${current}" target="_blank">${current}</a><br />`;
        }, '');
        // console.log(output);
        return output;
    };
}