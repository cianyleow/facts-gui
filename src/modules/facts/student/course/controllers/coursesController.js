define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		$scope.enrolledCourses = [];
		Restangular.one('self').getList('courses').then(function(courses) {
			$scope.enrolledCourses = courses;
			var courseIds = [];
			angular.forEach(courses, function(course) {
				courseIds.push(course.courseId);
			});
			Restangular.all('courses').getList().then(function(courses) {
				angular.forEach(courses, function(course) {
					if(courseIds.indexOf(course.courseId) > -1) {
						course.enrolled = true;
					}
				});
				$scope.allCourses = courses;
			});	
		});		
	}];
});