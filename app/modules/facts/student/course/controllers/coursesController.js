define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		$scope.enrolledCourses = [];
		$scope.allCourses = [];
		
		Restangular.one('enrollments').one('me').get().then(function(responses) {
			var courseIds = [];
			angular.forEach(responses, function(response) {
				courseIds.push(response.courseId);
				Restangular.one('courses', response.courseId).one('details').get().then(function(resp) {
					$scope.enrolledCourses.push(resp);
				});
			});
			
			// Once enrollments have been received, get all courses and set enrollment level for those that are enrolled in.
			Restangular.one('courses').get().then(function(responses) {
				angular.forEach(responses, function(response) {
					if(courseIds.indexOf(response.courseId) === -1) {
						$scope.allCourses.push(response);
					}
				});
			});
		});
	}];
});