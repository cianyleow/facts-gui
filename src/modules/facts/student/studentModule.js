define(['angular', './controllers/controllers', './course/courseModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.student.course'];
	var student = angular.module('facts.student', configFn);
	
	student.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.dashboard', {
				url: '/dashboard',
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/student/partials/dashboard.tpl.html',
						controller: 'facts.student.controllers.dashboard'
					}
				},
				data: {
					displayName: 'Dashboard'
				},
				resolve: {
					$title: function() { return 'Dashboard'; }
				}
			});
	}]);
	
	controllers.init(student);
	return student;
});