define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$window', 'facts.services.assignment', function($scope, $stateParams, Restangular, $window, AssignmentService) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.submissions = assignment.one('submissions').getList('self').$object;
	}];
});