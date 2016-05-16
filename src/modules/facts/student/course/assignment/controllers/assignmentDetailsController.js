define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', '$window', 'facts.services.assignment', function($scope, $stateParams, Restangular, $window, AssignmentService) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.suppliedFiles = assignment.getList('suppliedFiles').$object;
		$scope.submissions = assignment.getList('submissions').$object;

		$scope.submissionIcons = {
			'CREDIT': {
				iconClass: 'positive',
				icon: 'assignment_turned_in',
				description: 'This assignment is on time!'
			},
			'LATE': {
				iconClass: 'negative',
				icon: 'assignment_late',
				description: 'This assignment is late.'
			}
		};
	}];
});