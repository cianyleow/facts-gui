define(['baseTestSetup'],
    function(baseTestSetup) {
        'use strict';
        describe('base.filters.beforeNow', function() {
            var beforeNowFilter;

            baseTestSetup();

            beforeEach(inject(function(_beforeNowFilter_) {
                beforeNowFilter = _beforeNowFilter_;
            }));

            it('Undefined list returns empty list', function() {
                var items;
                expect(beforeNowFilter(items)).toEqual([]);
            });

            it('Empty input list returns empty list', function() {
                var items = [];
                expect(beforeNowFilter(items)).toEqual([]);
            });

            it('List returns elements only before the current time', function() {
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
                expect(beforeNowFilter(items)).toEqual([items[0]]);
            });
        });
    }
);