define(['./dueDate', './file', './downloadButton', './searchFilter', './autoFocus', './shakeOn', './countdownAction', './inProgress'], function(dueDate, file, downloadButton, searchFilter, autoFocus, shakeOn, countdownAction, inProgress) {
	'use strict';
	return {
		init: function(module) {
			module.directive('dueDate', dueDate);
			module.directive('file', file);
			module.directive('downloadButton', downloadButton);
			module.directive('searchFilter', searchFilter);
			module.directive('autoFocus', autoFocus);
			module.directive('shakeOn', shakeOn);
			module.directive('countdownAction', countdownAction);
			module.directive('inProgress', inProgress);
		}
	};
});