define(['modules/facts/services/studentService',
		'modules/facts/services/courseService'
], function(StudentService, CourseService) {
	'use strict';
	return {
		init: function(module) {
			module.service('facts.services.student', StudentService);
			module.service('facts.services.course', CourseService);
		}
	};
});