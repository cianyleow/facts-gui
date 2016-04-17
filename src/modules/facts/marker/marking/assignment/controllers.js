define([
		'./assignmentDetailsController',
		'./assignmentsController',
		'./submission/newSubmissionController',
		'./submission/submissionDetailsController'
	],
	function(AssignmentDetailsController, AssignmentsController, NewSubmissionController, SubmissionDetailsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.course.assignment.controllers.assignment-details-controller', AssignmentDetailsController);
				module.controller('facts.course.assignment.controllers.assignments-controller', AssignmentsController);
				module.controller('facts.course.assignment.submission.controllers.new-submission-controller', NewSubmissionController);
				module.controller('facts.course.assignment.submission.controllers.submission-details-controller', SubmissionDetailsController);
			}
		};
	}
);