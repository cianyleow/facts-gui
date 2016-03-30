define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		var student = Restangular.one('students', 'cyl312');
		$scope.enrolledCourses = student.getList('enrolledCourses').$object;
	}];
});