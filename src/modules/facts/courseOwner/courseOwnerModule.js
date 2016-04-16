define(['angular', './controllers/controllers', './course/courseModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.courseOwner.course'];
	var student = angular.module('facts.courseOwner', configFn);
	
	student.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courseOwner.dashboard', {
				url: '/dashboard',
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/partials/dashboard.tpl.html',
						controller: 'facts.courseOwner.controllers.dashboard'
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