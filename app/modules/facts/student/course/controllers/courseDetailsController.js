define([], function() {
	'use strict';
	return['$scope', '$stateParams', function($scope, $stateParams) {
		$scope.course = {};
		$scope.assignments = {};
	}];
});