define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'base.services.piechart', '$window', 'facts.services.assignment', function($scope, $stateParams, Restangular, PieChartService, $window, AssignmentService) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.suppliedFiles = assignment.getList('suppliedFiles').$object;
		$scope.submissions = assignment.getList('submissions').$object;
		$scope.markComponentOptions =  {thickness: 50};
		$scope.markComponentData = [];
		assignment.getList('markComponents').then(function(data) {
			$scope.markComponents = data;
			$scope.markComponentData = PieChartService.getPieChartLines(data);
		});

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