define([], function() {
	'use strict';
	return ['$scope', 'Restangular', '$state', '$log', function($scope, Restangular, $state, $log) {
		$scope.user = {
			name: 'Cian Leow',
			email: 'cian.leow12@imperial.ac.uk',
			username: 'cyl312'
		};
		
		$scope.menu = [
			{
				link: 'app.facts',
				icon: 'dashboard',
				title: 'Dashboard'
			},
			{
				link: 'app.facts.assignments',
				icon: 'assignment',
				title: 'Assignments'
			},
			{
				link: 'app.facts.courses',
				icon: 'account_balance',
				title: 'Courses'
			},
			{
				link: 'app.facts.grades',
				icon: 'grade',
				title: 'Grades'
			},
			{
				link: 'app.facts.messages',
				icon: 'message',
				title: 'Messages'
			}
		];
		
		$scope.currentPeriod = 'Spring 15/16';
		
		$scope.courses = Restangular.one('students', $scope.user.username).getList('enrolledCourses').$object;
		
		$scope.logout = function() {
			$log.debug('Logging out user');
			// Do something here to log the person out.
			$state.go('authorize');
		};
	}];
});