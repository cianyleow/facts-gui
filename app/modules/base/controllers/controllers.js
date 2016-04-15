define(['modules/base/controllers/sidenavStudentController',
	'modules/base/controllers/sidenavMarkerController',
	'modules/base/controllers/sidenavCourseOwnerController',
	'modules/base/controllers/userMenuController',
	'modules/base/controllers/toolbarController',
	'modules/base/controllers/authorizationController'
], function(SidenavStudentController, SidenavMarkerController, SidenavCourseOwnerController, UserMenuController, ToolbarController, AuthorizationController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('base.controllers.sidenav.student.controller', SidenavStudentController);
			module.controller('base.controllers.sidenav.marker.controller', SidenavMarkerController);
			module.controller('base.controllers.sidenav.courseOwner.controller', SidenavCourseOwnerController);
			module.controller('base.controllers.user-menu-controller', UserMenuController);
			module.controller('base.controllers.toolbar-controller', ToolbarController);
			module.controller('base.controllers.authorization-controller', AuthorizationController);
		}
	};
});