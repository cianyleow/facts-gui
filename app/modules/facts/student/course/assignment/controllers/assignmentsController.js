define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'facts.services.course', function($scope, $stateParams, CourseService) {
		$scope.assignments = CourseService.getAssignments($stateParams.courseId);
	}];
});