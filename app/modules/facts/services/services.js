define(['modules/facts/services/studentService',
		'modules/facts/services/courseService',
		'modules/facts/services/assignmentService',
		'modules/facts/services/submissionService'
], function(StudentService, CourseService, AssignmentService, SubmissionService) {
	'use strict';
	return {
		init: function(module) {
			module.service('facts.services.student', StudentService);
			module.service('facts.services.course', CourseService);
			module.service('facts.services.assignment', AssignmentService);
			module.service('facts.services.submission', SubmissionService);
		}
	};
});