define([
	'modules/facts/directives/assignmentCalendar'
], function(assignmentCalendar) {
	'use strict';
	return {
		init: function(module) {
			module.directive('assignmentCalendar', assignmentCalendar);
		}
	};
});