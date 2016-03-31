define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.markComponents = assignment.getList('markComponents').$object;
	}];
});