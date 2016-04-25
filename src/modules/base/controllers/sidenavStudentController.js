define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		
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

		$scope.courses = [];
		
		Restangular.one('self').getList('enrollments').then(function(enrollments) {
			angular.forEach(enrollments, function(enrollment) {
				$scope.courses.push(enrollment.course);
			});
		});

		$scope.baselink = 'base.app.courses.details';
	}];
});