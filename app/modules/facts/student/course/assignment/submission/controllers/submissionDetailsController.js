define([], function() {
	'use strict';
	return['$scope', '$state', '$stateParams', 'Restangular', function($scope, $state, $stateParams, Restangular) {
		var submission = Restangular.one('submissions', $stateParams.submissionId);
		$scope.submission = submission.get().$object;
		$scope.submissionFiles = submission.getList('submissionFiles').$object;
	}];
});