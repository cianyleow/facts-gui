define(['./dueDate', './file', './downloadButton'], function(dueDate, file, downloadButton) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
			module.directive('file', file);
			module.directive('downloadButton', downloadButton);
		}
	};
});