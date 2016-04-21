define([], function() {
	'use strict';
	return['Restangular', '$scope', '$stateParams', function(Restangular, $scope, $stateParams) {
		var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		$scope.feedback = feedback.get().$object;
		feedback.one('submission').get().then(function(_submission) {
			$scope.submission = _submission;
			Restangular.one('submissions', _submission.submissionId).getList('submissionFiles').then(function(_files) {
				$scope.submissionFiles = _files;
			});
		});
		$scope.comments = feedback.getList('comments').$object;
		$scope.marks = feedback.getList('marks').$object;

		$scope.submissionActions = [
			{
				description: 'Download files as ZIP',
				icon: 'folder',
				action: function() {
					console.log('Download as ZIP');
				}
			}
		];

		$scope.markActions = [

		];

		$scope.commentActions = [

		];
	}];
});