define(['angular', './controllers'], function(angular, controllers) {
	'use strict';
	var assignment = angular.module('facts.course.assignment', []);
	assignment.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('app.courses.details.assignments', {
				url: '/assignments',
				data: {
					displayName: 'Assignments'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/assignments.tpl.html',
						controller: 'facts.course.assignment.controllers.assignments-controller'
					}
				},
				resolve: {
					$title: function() {
						return 'Assignments';
					}
				}
			})
			.state('app.courses.details.assignments.details', {
				url: '/:assignmentId',
				data: {
					displayName: '{{assignment.title}}'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/assignment-details.tpl.html',
						controller: 'facts.course.assignment.controllers.assignment-details-controller'
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
			})
			.state('app.courses.details.assignments.details.submissions', {
				url: '/submission',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('app.courses.details.assignments.details.submissions.new', {
				url: '/new',
				data: {
					displayName: 'New Submission'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/submission/new-submission.tpl.html',
						controller: 'facts.course.assignment.submission.controllers.new-submission-controller'
					}
				},
				resolve: {
					$title: ['assignment', function(assignment) {
						return 'New Submission: ' + assignment.title;
					}]
				}
			})
			.state('app.courses.details.assignments.details.submissions.details', {
				url: '/:submissionId',
				data: {
					displayName: 'Submission'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/course/assignment/submission/submission-details.tpl.html',
						controller: 'facts.course.assignment.submission.controllers.submission-details-controller'
					}
				},
				resolve: {
					$title: ['assignment', function(assignment) {
						return 'Submission: ' + assignment.title;
					}]
				}
			});
	}]);
	
	controllers.init(assignment);
	return assignment;
});