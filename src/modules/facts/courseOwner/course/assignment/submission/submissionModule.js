define(['angular', './controllers/controllers'], function(angular, controllers) {
	'use strict';
	var configFn = [];
	var submission = angular.module('facts.student.course.assignment.submission', configFn);
	submission.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courses.details.assignments.details.submissions', {
				url: '/submission',
				abstract: true
			})
			.state('base.app.courses.details.assignments.details.submissions.new', {
				url: '/new',
				data: {
					displayName: 'New Submission'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/student/course/assignment/submission/new.tpl.html',
						controller: 'facts.student.course.assignment.submission.controllers.new'
					}
				},
				resolve: {
					$title: ['assignment', function(assignment) {
						return 'New Submission: ' + assignment.title;
					}]
				}
			})
			.state('base.app.courses.details.assignments.details.submissions.details', {
				url: '/:submissionId',
				data: {
					displayName: 'Submission'
				},
				views: {
					'mainContent@app': {
						templateUrl: 'modules/facts/student/course/assignment/submission/details.tpl.html',
						controller: 'facts.student.course.assignment.submission.controllers.details'
					}
				},
				resolve: {
					$title: ['assignment', function(assignment) {
						return 'Submission: ' + assignment.title;
					}]
				}
			});
	}]);
	
	controllers.init(submission);
	return submission;
});