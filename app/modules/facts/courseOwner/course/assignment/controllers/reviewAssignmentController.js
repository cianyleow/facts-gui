define([], function() {
	'use strict';
	return['$scope', 'Restangular', '$state', '$stateParams', '$q', 'base.services.file', 'base.services.piechart', 'facts.services.assignment', function($scope, Restangular, $state, $stateParams, $q, FileService, PieChartService, AssignmentService) {
		if(!AssignmentService.hasAssignmentForReview()) {
			$state.go('base.app.courseOwner.courses.details.assignments.new');
		}
		$scope.assignment = AssignmentService.getAssignmentForReview();
		$scope.markComponentData = PieChartService.getPieChartLines($scope.assignment.markComponents);
		$scope.markComponentOptions = {thickness: 30};
		
		$scope.create = function(assignment) {
			// Create assignment
			var baseAssignment = angular.copy(assignment);
			baseAssignment.groupBased = undefined;
			baseAssignment.suppliedFiles = undefined;
			var fd = new FormData();
			fd.append("assignment", JSON.stringify(baseAssignment));
			angular.forEach(assignment.suppliedFiles, function(suppliedFile) {
				fd.append("files", suppliedFile.file);
			});
			
			Restangular.one('courses', $stateParams.courseId).all('assignments').withHttpConfig({transformRequest: angular.identity}).customPOST(fd, undefined, undefined, {'Content-Type': undefined}).then(function(_assignment) {
				console.log(_assignment);
				
			});
		};
	}];
});