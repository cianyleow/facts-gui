define(['angular', './controllers/controllers', './assignment/assignmentModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.student.course.assignment'];
	var course = angular.module('facts.student.course', configFn);
	course.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courses', {
				url: '/courses',
				views: {
					'mainContent@base.app': {
							templateUrl: 'modules/facts/student/course/partials/courses.tpl.html',
							controller: 'facts.student.course.controllers.courses'
						}
				},
				data: {
					displayName: 'Courses'
				},
				resolve: {
					$title: function() { return 'Courses'; }
				}
			})
			.state('base.app.courses.details', {
				url: '/:courseId',
				data: {
					displayName: '{{course.shortName}}'
				},
				views: {
					'mainContent@base.app': {
							templateUrl: 'modules/facts/student/course/partials/details.tpl.html',
							controller: 'facts.student.course.controllers.details'
						}
				},
				resolve: {
					course: ['$stateParams', 'Restangular', function($stateParams, Restangular) {
						// Using a promise here so that it gets resolved before being used.
						return Restangular.one('courses', $stateParams.courseId).one('details').get().then(function(_course) {
							return _course;
						});
					}],
					$title: ['course', function(course) {
						return course.shortName + ": " + course.name;
					}]
				}
			});
	}]);
	
	controllers.init(course);
	return course;
});