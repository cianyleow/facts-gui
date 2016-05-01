define([], function() {
    'use strict';
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/base/directives/search-filter.tpl.html',
            scope: {
                term: '='
            },
            link: function(scope, element, attr) {
                scope.searchOpen = false;
                scope.toggleSearch = function() {
                    scope.term = '';
                    scope.searchOpen = !scope.searchOpen;
                };

                scope.closeSearch = function() {
                    scope.term = '';
                    scope.searchOpen = false;
                };
            }
        };
    }];
});
