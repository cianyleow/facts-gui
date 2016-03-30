define([], function() {
	'use strict';
	return ['$scope', 'Restangular', '$state', 'facts.services.enrollment', 'base.services.sidenav', 'base.services.user', function($scope, Restangular, $state, EnrollmentService, SideNavService, UserService) {
		$scope.user = UserService.getUser();
		
		$scope.menu = SideNavService.getMenuOptions();
		
		$scope.currentPeriod = 'Spring 15/16';
		
		$scope.courses = [];
		
		EnrollmentService.getEnrollmentsPromise().then(function(responses) {
			angular.forEach(responses, function(response) {
				$scope.courses.push(Restangular.one('courses', response.courseId).one('details').get().$object);
			});
		});
	}];
});