define(['angular', './controllers/controllers'], function(angular, controllers) {
	'use strict';
	var configFn = [];
	var assignment = angular.module('facts.courseOwner.course.assignment', configFn);
	assignment.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('base.app.courseOwner.courses.details.assignments', {
				url: '/assignments',
				data: {
					displayName: 'Assignments'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/assignment/partials/assignments.tpl.html',
						controller: 'facts.courseOwner.course.assignment.controllers.assignments'
					}
				},
				resolve: {
					$title: function() {
						return 'Assignments';
					}
				}
			})
			.state('base.app.courseOwner.courses.details.assignments.new', {
				url: '/new',
				data: {
					displayName: 'New Assignment'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/assignment/partials/new.tpl.html',
						controller: 'facts.courseOwner.course.assignment.controllers.new'
					}
				},
				resolves: {
					$title: function() {
						return 'New Assignment';
					}
				}
			})
			.state('base.app.courseOwner.courses.details.assignments.details', {
				url: '/:assignmentId',
				data: {
					displayName: '{{assignment.title}}'
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/assignment/partials/details.tpl.html',
						controller: 'facts.courseOwner.course.assignment.controllers.details'
					}
				},
				resolve: {
					assignment: ['$stateParams', 'Restangular', function($stateParams, Restangular) {
						return Restangular.one('assignments', $stateParams.assignmentId).get().then(function(_assignment) {
							return _assignment;
						});
					}],
					$title: ['assignment', function(assignment) {
						return 'Assignment: ' + assignment.name;
					}]
				}
			})
			.state('base.app.courseOwner.courses.details.assignments.new.review', {
				url: '/review',
				data: {
					displayName: 'Review',
				},
				views: {
					'mainContent@base.app': {
						templateUrl: 'src/modules/facts/courseOwner/course/assignment/partials/review.tpl.html',
						controller: 'facts.courseOwner.course.assignment.controllers.review'
					}
				},
				resolvse: {
					$title: function() {
						return 'Review Assignment';
					}
				}
			});
	}]);
	
	controllers.init(assignment);
	return assignment;
});