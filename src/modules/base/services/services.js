define(['./dialogService',
		'./fileService',
		'./tokenService',
		'./authenticationService',
		'./userService'
], function(DialogService, FileService, TokenService, AuthenticationService, UserService) {
	'use strict';
	return {
		init: function(module) {
			module.service('base.services.dialog', DialogService);
			module.service('base.services.file', FileService);
			module.service('base.services.token', TokenService);
			module.service('base.services.authentication', AuthenticationService);
			module.service('base.services.user', UserService);
		}
	};
});