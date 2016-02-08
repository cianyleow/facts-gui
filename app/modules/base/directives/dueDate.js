define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'E',
			templateUrl: 'modules/base/directives/due-date.tpl.html',
			scope: {
				dateString: '=',
			},
			controller: ['$log', '$scope', '$filter', function($log, $scope, $filter) {
				$scope.date = $filter('date')($scope.dateString, 'hh:mm:ss a dd/MMM/yyyy');
				var today = Date.now();
				$log.debug(today);
				var due = Date.parse($scope.dateString);
				$log.debug(due);
				if(today > due) {
					$scope.late = true;
				} else if(today - 3600*24*5 > due) {
					$scope.close = true;
				} else {
					$scope.early = true;
				}
			}],
			link: function(scope, el, attrs) {
				
			}
		};
	}];
});
