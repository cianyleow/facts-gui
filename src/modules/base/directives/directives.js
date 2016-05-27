define(['./dueDate', './file', './downloadButton', './searchFilter', './autoFocus', './shakeOn', './countdownAction', './inProgress', './confirmAction'],
	function(dueDate, file, downloadButton, searchFilter, autoFocus, shakeOn, countdownAction, inProgress, confirmAction) {
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
			module.directive('confirmAction', confirmAction);
		}
	};
});