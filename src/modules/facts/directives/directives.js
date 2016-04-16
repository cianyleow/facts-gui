define([
	'modules/facts/directives/assignmentCalendar',
	'modules/facts/directives/validSubmissionFile'
], function(assignmentCalendar, validSubmissionFile) {
	'use strict';
	return {
		init: function(module) {
			module.directive('assignmentCalendar', assignmentCalendar);
			module.directive('validSubmissionFile', validSubmissionFile);
		}
	};
});