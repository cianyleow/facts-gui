define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.filters.relativeTime', function() {
            var relativeTimeFilter;

            baseTestSetup();

            beforeEach(inject(function(_relativeTimeFilter_) {
                relativeTimeFilter = _relativeTimeFilter_;
            }));

            it('Undefined date representation returns blank text', function() {
                var date;
                expect(relativeTimeFilter(date)).toEqual('');
            });

            it('Incorrect (not integer) date format results in blank text', function() {
                var date = '';
                expect(relativeTimeFilter(date)).toEqual('');
                date = {};
                expect(relativeTimeFilter(date)).toEqual('');
            });

            it('Date or integer time work as input', function() {
                var epochDate = new Date(0);
                var epochTime = 0;
                expect(relativeTimeFilter(epochDate)).toEqual('on 01 Jan, 1970');
                expect(relativeTimeFilter(epochTime)).toEqual('on 01 Jan, 1970');
            });
        });
    }
);