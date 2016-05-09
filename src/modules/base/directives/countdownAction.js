define([], function() {
    'use strict';
    return ['$interval', function($interval) {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/base/directives/countdown-action.tpl.html',
            scope: {
                actionPhrase: '@',
                seconds: '@',
                action: '=',
                start: '='
            },
            controller: ['$scope', function($scope) {
                $scope._seconds = angular.copy($scope.seconds);
                $scope.decrement = function() {
                    $scope._seconds -= 1;
                };
                $scope.$watch('start', function(newValue) {
                    if(newValue) {
                        $interval($scope.decrement, 1000, $scope.seconds).then(function() {$scope.action()});
                    }
                });
            }]
        };
    }];
});
