define(['./dialogService',
		'./fileService'
], function(DialogService, FileService) {
	'use strict';
	return {
		init: function(module) {
			module.service('base.services.dialog', DialogService);
			module.service('base.services.file', FileService);
		}
	};
});