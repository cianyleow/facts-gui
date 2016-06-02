define([], function() {
	'use strict';
	return['$scope', '$state', '$stateParams', 'Restangular', 'facts.services.assignment', function($scope, $state, $stateParams, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		var submission = Restangular.one('submissions', $stateParams.submissionId);
		submission.get().then(function(_submission) {
			$scope.submission = _submission;
			$scope.submission.feedback.comments = submission.one('feedback', _submission.feedback.feedbackId).getList('comments').$object;
		});
	}];
});