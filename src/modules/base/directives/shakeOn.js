define([], function() {
    'use strict';
    return ['$animate', function($animate) {
        return {
            restrict: 'A',
            scope: {
                shakeOn: '='
            },
            link: function(scope, element) {
                scope.$watch('shakeOn', function(autoFocus) {
                    $animate.addClass(element, 'shake').then(function() {
                        element.removeClass('shake');
                    });
                });
            }
        };
    }];
});
