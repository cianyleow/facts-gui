define([
		'./assignmentDetailsController',
		'./assignmentsController'
	], 
	function(AssignmentDetailsController, AssignmentsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.course.assignment.controllers.assignment-details-controller', AssignmentDetailsController);
				module.controller('facts.course.assignment.controllers.assignments-controller', AssignmentsController);
			}
		};
	}
);