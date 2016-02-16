define(['./dueDate', './file'], function(dueDate, file) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
			module.directive('file', file);
		}
	};
});