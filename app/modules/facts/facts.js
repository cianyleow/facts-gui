define(['angular',
	'modules/facts/controllers/controllers',
	'modules/facts/services/services',
	'modules/facts/directives/directives'],
	function(angular, controllers, services, directives) {
		'use strict';
		var configFn = [];
		var facts = angular.module('facts', configFn);
		
		facts.config(['$stateProvider', function($stateProvider) {
			$stateProvider.
				state('app.facts', {
					url: 'facts',
					views: {
						'mainContent@app': {
							templateUrl: 'modules/facts/partials/dashboard.tpl.html',
							controller: 'facts.controllers.dashboard-controller'
						},
					},
					data: {
						displayName: 'Dashboard'
					},
					resolve: {
						$title: function() { return 'Dashboard'; }
					}
				})
				.state('app.facts.courses', {
					url: '/courses',
					data: {
						displayName: 'Courses'
					},
					resolve: {
						$title: function() { return 'Courses'; }
					}
				})
				.state('app.facts.courses.details', {
					url: '/:courseId',
					data: {
						displayName: '{{course.shortName}}'
					},
					resolve: {
						course: ['$stateParams', 'facts.services.course', function($stateParams, CourseService) {
							// Using a promise here so that it gets resolved before being used.
							return CourseService.getCoursePromise($stateParams.courseId).then(function(_course) {
								return _course;
							});
						}],
						$title: ['course', function(course) {
							return course.shortName + ": " + course.name;
						}]
					}
				});
	}]);
	
	controllers.init(facts);
	services.init(facts);
	directives.init(facts);
	return facts;
});