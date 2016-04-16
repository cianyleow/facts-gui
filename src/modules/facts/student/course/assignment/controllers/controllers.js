define([
		'./assignmentDetailsController',
		'./assignmentsController'
	], 
	function(AssignmentDetailsController, AssignmentsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.student.course.assignment.controllers.details', AssignmentDetailsController);
				module.controller('facts.student.course.assignment.controllers.assignments', AssignmentsController);
			}
		};
	}
);