define(['modules/base/controllers/sidenavController',
	'modules/base/controllers/userMenuController',
	'modules/base/controllers/toolbarController'
], function(SidenavController, UserMenuController, ToolbarController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('base.controllers.sidenav-controller', SidenavController);
			module.controller('base.controllers.user-menu-controller', UserMenuController);
			module.controller('base.controllers.toolbar-controller', ToolbarController);
		}
	};
});