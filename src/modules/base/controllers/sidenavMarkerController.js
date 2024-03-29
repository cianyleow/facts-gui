define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		
		$scope.menu = [
			{
				link: 'base.app.marker.dashboard',
				icon: 'dashboard',
				title: 'Dashboard'
			},
			{
				link: 'base.app.marker.marking',
				icon: 'grade',
				title: 'Marking'
			},
			{
				link: 'base.app.marker.history',
				icon: 'history',
				title: 'History'
			},
			{
				link: 'base.app.marker.messages',
				icon: 'message',
				title: 'Messages'
			}
		];
		
		$scope.currentPeriod = 'Spring 15/16';

		$scope.courses = Restangular.one('self').getList('markedCourses').$object;

		$scope.baselink = 'base.app.marker.courses.details';
	}];
});