define([
		'./coursesController',
		'./courseDetailsController',
		'./enrollmentsController'
	],
	function(CoursesController, CourseDetailsController, EnrollmentsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.courseOwner.course.controllers.courses', CoursesController);
				module.controller('facts.courseOwner.course.controllers.details', CourseDetailsController);
				module.controller('facts.courseOwner.course.controllers.enrollments', EnrollmentsController);
			}
		};
	}
);