define([], function() {
	'use strict';
	return['$scope', '$state', '$stateParams', 'facts.services.submission', function($scope, $state, $stateParams, SubmissionService) {
		$scope.submission = SubmissionService.getSubmission($stateParams.submissionId);
		$scope.submissionVersion = 1;
	}];
});