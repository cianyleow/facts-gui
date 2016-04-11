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
					course: ['$stateParams', 'facts.services.course', function($stateParams, CourseService) {
						return CourseService.loadCourse($stateParams.courseId);
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