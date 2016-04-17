define([
		'./coursesController',
		'./courseDetailsController'
	],
	function(CoursesController, CourseDetailsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.student.course.controllers.courses', CoursesController);
				module.controller('facts.student.course.controllers.details', CourseDetailsController);
			}
		};
	}
);