define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'E',
			templateUrl: 'modules/base/directives/due-date.tpl.html',
			scope: {
				dateString: '=',
			},
			controller: ['$scope', '$filter', function($scope, $filter) {
				$scope.date = $filter('date')($scope.dateString, 'hh:mm:ss a dd/MMM/yyyy');
			}],
			link: function(scope, el, attrs) {
				
			}
		};
	}];
});
