define(['modules/facts/controllers/dashboardController'
], function(DashboardController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('facts.controllers.dashboard-controller', DashboardController);
		}
	};
});