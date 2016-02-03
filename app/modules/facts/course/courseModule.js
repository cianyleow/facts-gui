define(['angular', './controllers', './assignment/assignmentModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.course.assignment'];
	var course = angular.module('facts.course', configFn);
	course.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('app.courses', {
				url: 'courses',
				views: {
					'mainContent@app': {
							templateUrl: 'modules/facts/course/courses.tpl.html',
							controller: 'facts.course.controllers.courses-controller'
						}
				},
				data: {
					displayName: 'Courses'
				},
				resolve: {
					$title: function() { return 'Courses'; }
				}
			})
			.state('app.courses.details', {
				url: '/:courseId',
				data: {
					displayName: '{{course.shortName}}'
				},
				views: {
					'mainContent@app': {
							templateUrl: 'modules/facts/course/course-details.tpl.html',
							controller: 'facts.course.controllers.course-details-controller'
						}
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
	
	controllers.init(course);
	return course;
});