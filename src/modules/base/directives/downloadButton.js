define([], function() {
    'use strict';
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/base/directives/download-button.tpl.html',
            scope: {
                fileId: '=',
            },
            controller: ['$scope', 'Restangular', '$window', function($scope, Restangular, $window) {
                $scope.download = function() {
                    console.log($scope.fileId);
                    Restangular.one('files', $scope.fileId).one('link').get().then(function(fileLink) {
                        $window.open('api/files/' + fileLink.link + '/download');
                    });
                };
            }]
        };
    }];
});
