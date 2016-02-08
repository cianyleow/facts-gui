define(['angular',
	'modules/base/controllers/controllers',
	'modules/base/directives/directives',
	'modules/base/filters/filters'
], function(angular, controllers, directives, filters) {
	'use strict';
	var base = angular.module('base', []);
	controllers.init(base);
	directives.init(base);
	filters.init(base);
	
	base.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		// Always redirect to dashboard if unknown or base entry.
		$urlRouterProvider.when("", "/dashboard");
		$urlRouterProvider.when("/", "/dashboard");
		$urlRouterProvider.otherwise('/dashboard');
		
		$stateProvider
			.state('authorize', {
				url: '/authorize',
				views: {
					root: {
						templateUrl: 'app/modules/base/partials/authorization.tpl.html',
						controller: 'base.controllers.authorization'
					}
				}
			})
			.state('app', {
				url: '/',
				abstract: true,
				views: {
					root: {
						templateUrl: 'modules/base/partials/app.tpl.html'
					},
					sidenav: {
						templateUrl: 'modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav-controller'
					},
					toolbar: {
						templateUrl: 'modules/base/partials/toolbar.tpl.html',
						controller: 'base.controllers.toolbar-controller'
					}
				},
				data: {
					displayName: 'FACTS'
				}
			});
	}]);
	return base;
});