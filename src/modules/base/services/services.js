define(['./dialogService',
		'./fileService',
		'./tokenService',
		'./authenticationService',
		'./pieChartService'
], function(DialogService, FileService, TokenService, AuthenticationService, PieChartService) {
	'use strict';
	return {
		init: function(module) {
			module.service('base.services.dialog', DialogService);
			module.service('base.services.file', FileService);
			module.service('base.services.token', TokenService);
			module.service('base.services.authentication', AuthenticationService);
			module.service('base.services.piechart', PieChartService);
		}
	};
});