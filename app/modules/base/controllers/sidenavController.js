define([], function() {
	'use strict';
	return ['$scope', 'Restangular', '$state', 'facts.services.enrollment', 'base.services.sidenav', 'base.services.user', 'facts.services.course', function($scope, Restangular, $state, EnrollmentService, SideNavService, UserService, CourseService) {
		$scope.user = UserService.getUser();
		
		$scope.menu = SideNavService.getMenuOptions();
		
		$scope.currentPeriod = 'Spring 15/16';
		
		$scope.courses = [];
		
		EnrollmentService.getEnrollmentsPromise().then(function(responses) {
			angular.forEach(responses, function(response) {
				$scope.courses.push(CourseService.getCourseDetails(response.courseId));
			});
		});
	}];
});