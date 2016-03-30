define(['modules/base/controllers/sidenavController',
	'modules/base/controllers/userMenuController',
	'modules/base/controllers/toolbarController',
	'modules/base/controllers/authorizationController'
], function(SidenavController, UserMenuController, ToolbarController, AuthorizationController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('base.controllers.sidenav-controller', SidenavController);
			module.controller('base.controllers.user-menu-controller', UserMenuController);
			module.controller('base.controllers.toolbar-controller', ToolbarController);
			module.controller('base.controllers.authorization-controller', AuthorizationController);
		}
	};
});