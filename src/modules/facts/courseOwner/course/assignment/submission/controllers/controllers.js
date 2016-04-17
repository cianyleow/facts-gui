define([
		'./newSubmissionController',
		'./submissionDetailsController'
	],
	function(NewSubmissionController, SubmissionDetailsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.student.course.assignment.submission.controllers.new', NewSubmissionController);
				module.controller('facts.student.course.assignment.submission.controllers.details', SubmissionDetailsController);
			}
		};
	}
);