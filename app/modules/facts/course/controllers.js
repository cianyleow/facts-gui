define([
		'./coursesController',
		'./courseDetailsController',
		'./assignment/assignmentDetailsController',
		'./assignment/assignmentsController'
	], 
	function(CoursesController, CourseDetailsController, AssignmentDetailsController, AssignmentsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.course.controllers.courses-controller', CoursesController);
				module.controller('facts.course.controllers.course-details-controller', CourseDetailsController);
				module.controller('facts.course.controllers.assignment-details-controller', AssignmentDetailsController);
				module.controller('facts.course.controllers.assignments-controller', AssignmentsController);
			}
		};
	}
);