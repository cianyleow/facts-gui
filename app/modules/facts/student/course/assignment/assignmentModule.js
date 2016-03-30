define(['angular', './controllers/controllers', './submission/submissionModule'], function(angular, controllers) {
	'use strict';
	var configFn = ['facts.student.course.assignment.submission'];
	var assignment = angular.module('facts.student.course.assignment', configFn);
	assignment.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courses.details.assignments', {
				url: '/assignments',
				data: {
					displayName: 'Assignments'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'modules/facts/student/course/assignment/partials/assignments.tpl.html',
						controller: 'facts.student.course.assignment.controllers.assignments'
					}
				},
				resolve: {
					$title: function() {
						return 'Assignments';
					}
				}
			})
			.state('base.app.courses.details.assignments.details', {
				url: '/:assignmentId',
				data: {
					displayName: '{{assignment.title}}'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'modules/facts/student/course/assignment/partials/details.tpl.html',
						controller: 'facts.student.course.assignment.controllers.details'
					}
				},
				resolve: {
					assignment: ['$stateParams', 'Restangular', function($stateParams, Restangular) {
						return Restangular.one('assignments', $stateParams.assignmentId).get().then(function(_assignment) {
							return _assignment;
						});
					}],
					$title: ['assignment', function(assignment) {
						return 'Assignment: ' + assignment.title;
					}]
				}
			});
	}]);
	
	controllers.init(assignment);
	return assignment;
});