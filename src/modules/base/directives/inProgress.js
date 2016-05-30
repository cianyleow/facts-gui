define([], function() {
    'use strict';
    return ['$mdDialog', function($mdDialog) {
        return {
            restrict: 'A',
            scope: {
                inProgress: '='
            },
            link: function(scope, element) {
                element.bind('click', function() {
                    if(scope.inProgress === true) {
                        $mdDialog.show($mdDialog.alert({title: 'In Progress', textContent: 'This functionality is still a work in progress. Please check back later for a working version.', ok: 'Close'}));
                    }
                });
            }
        };
    }];
});
