define(['angular',
	'modules/facts/controllers/controllers',
	'modules/facts/services/services',
	'modules/facts/directives/directives',
	'modules/facts/course/courseModule'],
	function(angular, controllers, services, directives) {
		'use strict';
		var configFn = ['facts.course'];
		var facts = angular.module('facts', configFn);
		
		facts.config(['$stateProvider', function($stateProvider) {
			$stateProvider.
				state('app.dashboard', {
					url: 'dashboard',
					views: {
						'mainContent@app': {
							templateUrl: 'modules/facts/partials/dashboard.tpl.html',
							controller: 'facts.controllers.dashboard-controller'
						}
					},
					data: {
						displayName: 'Dashboard'
					},
					resolve: {
						$title: function() { return 'Dashboard'; }
					}
				});
	}]);
	
	controllers.init(facts);
	services.init(facts);
	directives.init(facts);
	return facts;
});