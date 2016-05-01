define(['./dueDate', './file', './downloadButton', './searchFilter', './autoFocus'], function(dueDate, file, downloadButton, searchFilter, autoFocus) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
			module.directive('file', file);
			module.directive('downloadButton', downloadButton);
			module.directive('searchFilter', searchFilter);
			module.directive('autoFocus', autoFocus);
		}
	};
});