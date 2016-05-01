define([], function() {
    'use strict';
    return ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                autoFocus: '='
            },
            link: function(scope, element, attr) {
                scope.$watch('autoFocus', function(autoFocus) {
                    if(autoFocus) {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }];
});
