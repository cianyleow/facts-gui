define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'facts.services.assignment', function($scope, $stateParams, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
	}];
});