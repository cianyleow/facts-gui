define(['./dueDate', './file', './downloadButton', './searchFilter', './autoFocus', './shakeOn'], function(dueDate, file, downloadButton, searchFilter, autoFocus, shakeOn) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
			module.directive('file', file);
			module.directive('downloadButton', downloadButton);
			module.directive('searchFilter', searchFilter);
			module.directive('autoFocus', autoFocus);
			module.directive('shakeOn', shakeOn);
		}
	};
});