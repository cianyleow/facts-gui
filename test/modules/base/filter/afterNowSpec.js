define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.filters.afterNow', function() {
            var afterNowFilter;

            baseTestSetup();

            beforeEach(inject(function(_afterNowFilter_) {
                afterNowFilter = _afterNowFilter_;
            }));

            it('Undefined list returns empty list', function() {
                var items = undefined;
                expect(afterNowFilter(items)).toEqual([]);
            });

            it('Empty input list returns empty list', function($httpBackend) {
                var items = [];
                expect(afterNowFilter(items)).toEqual([]);
            });

            it('List returns elements only after the current time', inject(function($httpBackend) {
                var now = new Date();
                var hour = 3600 * 1000;
                var items = [
                    {
                        checkId: 1,
                        dueTime: now.getTime() - hour
                    },
                    {
                        checkId: 2,
                        dueTime: now.getTime() + hour
                    }
                ];
                expect(afterNowFilter(items)).toEqual([items[1]]);
            }));
        });
    }
);