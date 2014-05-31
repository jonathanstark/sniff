describe('sniff Tests', function () {

    describe('User Agent String Tests', function () {

        'use strict';

        $.ajax({
            url: 'tests/data.json',
            async: false,
            dataType: 'json',
            success: function (data) {

                Object.keys(data).forEach(function (browser) {

                    data[browser].forEach(function (version) {

                        version.useragentstrings.forEach(function (string) {

                            it('Testing ' + string, function() {

                                expect(sniff(string).browser).toBe(version.browser);
                                expect(sniff(string).version).toBe(version.version);

                            });

                        });

                    });

                });

            }

        });

    });

});
