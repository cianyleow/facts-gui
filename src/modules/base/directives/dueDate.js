define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'E',
			templateUrl: 'src/modules/base/directives/due-date.tpl.html',
			scope: {
				dateString: '=',
			},
			controller: ['$scope', '$filter', function($scope, $filter) {
				var today = Date.now();
				var due = new Date($scope.dateString);
				var diff = due - today;
				var daysLeft = Math.floor(diff / (3600 * 24 * 1000));
				if(daysLeft < 0) {
					$scope.late = true;
					$scope.message = 'Late';
				} else if(daysLeft < 1) {
					$scope.close = true;
					var hours = Math.floor(diff / (3600 * 1000));
					var minutes = Math.ceil(Math.floor(diff % (3600 * 1000)) / (60 * 1000));
					$scope.message = hours + ' hours ' + minutes + ' minutes left';
				} else {
					$scope.early = true;
					$scope.message = daysLeft + ' days left';
				}
				$scope.date = $filter('date')($scope.dateString, 'hh:mm:ss a dd/MMM/yyyy');
			}]
		};
	}];
});
