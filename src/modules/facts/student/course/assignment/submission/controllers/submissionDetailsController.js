define([], function() {
	'use strict';
	return['$scope', '$state', '$stateParams', 'Restangular', 'facts.services.assignment', function($scope, $state, $stateParams, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		var submission = Restangular.one('submissions', $stateParams.submissionId);
		$scope.submission = submission.get().$object;
		$scope.submissionFiles = submission.getList('submissionFiles').$object;
	}];
});