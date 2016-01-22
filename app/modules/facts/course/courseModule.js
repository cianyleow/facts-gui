define(['angular', './controllers'], function(angular, controllers) {
	'use strict';
	var course = angular.module('facts.course', []);
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
			})
			.state('app.courses.details.assignments', {
				url: '/assignments',
				data: {
					displayName: 'Assignments'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/assignments.tpl.html',
						controller: 'facts.course.controllers.assignments-controller'
					}
				},
			})
			.state('app.courses.details.assignments.details', {
				url: '/:assignmentId',
				data: {
					displayName: '{{assignment.title}}'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/assignment-details.tpl.html',
						controller: 'facts.course.controllers.assignment-details-controller'
					}
				},
				resolve: {
					assignment: ['$stateParams', 'facts.services.assignment', function($stateParams, AssignmentService) {
						return AssignmentService.getAssignmentPromise($stateParams.assignmentId).then(function(_assignment) {
							return _assignment;
						});
					}],
					$title: ['assignment', function(assignment) {
						return 'Assignment: ' + assignment.title;
					}]
				}
		
			});
	}]);
	
	controllers.init(course);
	return course;
});