define([
		'./assignmentDetailsController',
		'./assignmentsController',
		'./newAssignmentController',
		'./reviewAssignmentController'
	],
	function(AssignmentDetailsController, AssignmentsController, NewAssignmentController, ReviewAssignmentController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.courseOwner.course.assignment.controllers.details', AssignmentDetailsController);
				module.controller('facts.courseOwner.course.assignment.controllers.assignments', AssignmentsController);
				module.controller('facts.courseOwner.course.assignment.controllers.new', NewAssignmentController);
				module.controller('facts.courseOwner.course.assignment.controllers.review', ReviewAssignmentController);
			}
		};
	}
);