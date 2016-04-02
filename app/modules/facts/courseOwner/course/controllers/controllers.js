define([
		'./coursesController',
		'./courseDetailsController'
	], 
	function(CoursesController, CourseDetailsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.courseOwner.course.controllers.courses', CoursesController);
				module.controller('facts.courseOwner.course.controllers.details', CourseDetailsController);
			}
		};
	}
);