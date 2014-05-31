(function () {

    'use strict';

    function sniff(useragenstring) {

        var browsers = {
                'Opera': /Opera(?:[\/ ]([0-9.]+))?(?:[\w\W]*Version[\/ ]([0-9.]+))?/i,
                'Chrome': /Chrome\/([0-9.]+)?/i,
                'Safari': /(?:Version\/([0-9.]+)[\w\W]*)?Safari[\/ ](?:[0-9.]+)?/i,
                'Firefox': /Firefox(?:[\/\( ]?([0-9.]+))?/i,
                'Internet Explorer': /MSIE(?:[\/ ]([0-9.]+))?/i
            },
            browser,
            matches = [],
            results = {
                browser: null,
                version: null,
                toString: function () {

                    return this.browser + ', ' + this.version;

                }
            };

        if (useragenstring === undefined) {

            useragenstring = window.navigator.userAgent;

        }

        for (browser in browsers) {

            if (browsers[browser] !== undefined) {

                matches = useragenstring.match(browsers[browser]);

                if (matches) {

                    if (matches[2]) {

                        results.version = matches[2];

                    } else if (matches[1]) {

                        results.version = matches[1];

                    }

                    results.browser = browser;

                    break;

                }

            }

        }

        if (results.browser !== null) {

            return results;

        }

        return false;

    }

    if (typeof define === 'function' && define.amd !== undefined) {

        define([], sniff);

    } else if (typeof module === 'object' && module.exports !== undefined) {

        module.exports = sniff;

    } else {

        window.sniff = sniff;

    }

}());
