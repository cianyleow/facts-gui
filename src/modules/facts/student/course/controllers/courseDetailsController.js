define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'facts.services.course', 'Restangular', function($scope, $stateParams, CourseService, Restangular) {
		$scope.course = CourseService.getCourse($stateParams.courseId);
		$scope.assignments = Restangular.one('courses', $stateParams.courseId).getList('assignments').$object;
	}];
});