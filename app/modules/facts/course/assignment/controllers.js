define([
		'./assignmentDetailsController',
		'./assignmentsController',
		'./submission/newSubmissionController',
	], 
	function(AssignmentDetailsController, AssignmentsController, NewSubmissionController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.course.assignment.controllers.assignment-details-controller', AssignmentDetailsController);
				module.controller('facts.course.assignment.controllers.assignments-controller', AssignmentsController);
				module.controller('facts.course.assignment.submission.controllers.new-submission-controller', NewSubmissionController);
			}
		};
	}
);