define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		$scope.menuSource = 'src/modules/base/partials/menu/courseOwner.tpl.html';
		
		$scope.menu = [
			{
				link: 'base.app.courseOwner.dashboard',
				icon: 'dashboard',
				title: 'Dashboard'
			},
			{
				link: 'base.app.coursesOwner.assignments',
				icon: 'assignment',
				title: 'Assignments'
			},
			{
				link: 'base.app.courseOwner.courses',
				icon: 'account_balance',
				title: 'Courses'
			},
			{
				link: 'base.app.courseOwner.grades',
				icon: 'grade',
				title: 'Grades'
			},
			{
				link: 'base.app.courseOwner.messages',
				icon: 'message',
				title: 'Messages'
			}
		];
		
		$scope.currentPeriod = 'Spring 15/16';

		$scope.courses = Restangular.one('self').getList('owned').$object;

		$scope.baselink = 'base.app.courseOwner.courses.details';
	}];
});