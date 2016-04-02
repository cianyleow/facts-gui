define(['./dashboardController'
], function(DashboardController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('facts.courseOwner.controllers.dashboard', DashboardController);
		}
	};
});