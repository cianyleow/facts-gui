define(['./dueDate'], function(dueDate) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
		}
	};
});