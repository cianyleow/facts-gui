define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
		var course = Restangular.one('courses', $stateParams.courseId);
		$scope.course = course.get().$object;
		$scope.assignments = course.getList('assignments').$object; 
	}];
});