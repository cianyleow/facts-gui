define(['./dashboardController'
], function(DashboardController) {
	'use strict';
	return {
		init: function(module) {
			module.controller('facts.student.controllers.dashboard', DashboardController);
		}
	};
});