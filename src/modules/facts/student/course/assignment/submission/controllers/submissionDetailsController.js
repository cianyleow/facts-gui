define([], function() {
	'use strict';
	return['$scope', '$state', '$stateParams', 'Restangular', 'facts.services.assignment', function($scope, $state, $stateParams, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		var submission = Restangular.one('submissions', $stateParams.submissionId);
		$scope.submission = submission.get().$object;
		$scope.submissionFiles = submission.getList('submissionFiles').$object;
		submission.one('feedback').get().then(function(_feedback) {
			if(_feedback.commentReleased) {
				_feedback.comments = submission.one('feedback', _feedback.feedbackId).getList('comments').$object;
			}

			if(_feedback.markReleased) {
				_feedback.grade = submission.one('feedback', _feedback.feedbackId).one('grade').get().$object;
			}
			$scope.feedback = _feedback;
		});
	}];
});