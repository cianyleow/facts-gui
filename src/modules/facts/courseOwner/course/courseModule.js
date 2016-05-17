define(['angular', './controllers/controllers', './assignment/assignmentModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.courseOwner.course.assignment'];
	var course = angular.module('facts.courseOwner.course', configFn);
	course.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courseOwner.courses', {
				url: '/courses',
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/partials/courses.tpl.html',
						controller: 'facts.courseOwner.course.controllers.courses'
					}
				},
				data: {
					displayName: 'Courses'
				},
				resolve: {
					$title: function() { return 'Courses'; }
				}
			})
			.state('base.app.courseOwner.courses.details', {
				url: '/:courseId',
				data: {
					displayName: '{{course.shortName}}'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/partials/details.tpl.html',
						controller: 'facts.courseOwner.course.controllers.details'
					}
				},
				resolve: {
					course: ['$stateParams', 'Restangular', function($stateParams, Restangular) {
						// Using a promise here so that it gets resolved before being used.
						return Restangular.one('courses', $stateParams.courseId).get().then(function(_course) {
							return _course;
						});
					}],
					$title: ['course', function(course) {
						return course.shortName + ': ' + course.name;
					}]
				}
			})
			.state('base.app.courseOwner.courses.details.enrollments', {
				url: '/enrollments',
				data: {
					displayName: 'Enrollments'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/partials/enrollments.tpl.html',
						controller: 'facts.courseOwner.course.controllers.enrollments'
					}
				},
				resolve: {
					$title: ['course', function(course) {
						return course.shortName + ' Enrollments';
					}]
				}
			});
	}]);
	
	controllers.init(course);
	return course;
});