define([], function() {
	'use strict';
	return ['$scope', 'Restangular', '$state', 'facts.services.enrollment', function($scope, Restangular, $state, EnrollmentService) {
		var userSelf = Restangular.one('self');
		
		$scope.user = userSelf.get().$object;
		
		$scope.menu = [
			{
				link: 'base.app.dashboard',
				icon: 'dashboard',
				title: 'Dashboard'
			},
			{
				link: 'base.app.assignments',
				icon: 'assignment',
				title: 'Assignments'
			},
			{
				link: 'base.app.courses',
				icon: 'account_balance',
				title: 'Courses'
			},
			{
				link: 'base.app.grades',
				icon: 'grade',
				title: 'Grades'
			},
			{
				link: 'base.app.messages',
				icon: 'message',
				title: 'Messages'
			}
		];
		
		$scope.currentPeriod = 'Spring 15/16';
		
		$scope.courses = userSelf.getList('courses').$object;
	}];
});