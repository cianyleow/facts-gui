define([], function() {
	'use strict';
	return ['$scope', 'Restangular', '$state', 'facts.services.enrollment', 'base.services.sidenav', function($scope, Restangular, $state, EnrollmentService, SideNavService) {
		var userSelf = Restangular.one('self');
		
		$scope.user = userSelf.get().$object;
		
		$scope.menu = SideNavService.getMenuOptions();
		
		$scope.currentPeriod = 'Spring 15/16';
		
		$scope.courses = userSelf.getList('courses').$object;
	}];
});