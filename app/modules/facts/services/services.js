define(['modules/facts/services/studentService',
		'modules/facts/services/assignmentService',
		'modules/facts/services/submissionService',
		'modules/facts/services/enrollmentService'
], function(StudentService, AssignmentService, SubmissionService, EnrollmentService) {
	'use strict';
	return {
		init: function(module) {
			module.service('facts.services.student', StudentService);
			module.service('facts.services.assignment', AssignmentService);
			module.service('facts.services.submission', SubmissionService);
			module.service('facts.services.enrollment', EnrollmentService);
		}
	};
});