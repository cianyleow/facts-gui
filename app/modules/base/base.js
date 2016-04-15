define(['angular',
	'modules/base/controllers/controllers',
	'modules/base/directives/directives',
	'modules/base/filters/filters',
	'modules/base/services/services'
], function(angular, controllers, directives, filters, services) {
	'use strict';
	var base = angular.module('base', []);
	controllers.init(base);
	directives.init(base);
	filters.init(base);
	services.init(base);
	
	base.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		// Always redirect to dashboard if unknown or base entry.
		$urlRouterProvider.when("", "/dashboard");
		$urlRouterProvider.when("/", "/dashboard");
		$urlRouterProvider.otherwise('/dashboard');
		
		$stateProvider
			.state('authorize', {
				url: '/authorize',
				templateUrl: 'modules/base/partials/authorization.tpl.html',
				controller: 'base.controllers.authorization-controller'
			})
			.state('base', {
				abstract: true,
				templateUrl: 'modules/base/partials/framework.tpl.html'
			})
			.state('base.app', {
				abstract: true,
				views: {
					root: {
						templateUrl: 'modules/base/partials/app.tpl.html'
					},
					sidenav: {
						templateUrl: 'modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.student.controller'
					},
					toolbar: {
						templateUrl: 'modules/base/partials/toolbar.tpl.html',
						controller: 'base.controllers.toolbar-controller'
					}
				}
			})
			.state('base.app.courseOwner', {
				url: '/courseOwner',
				abstract: true,
				views: {
					'sidenav@base': {
						templateUrl: 'modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.courseOwner.controller'
					},
				}
			})
			.state('base.app.marker', {
				url: '/marker',
				abstract: true,
				views: {
					'sidenav@base': {
						templateUrl: 'modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.marker.controller'
					},
				}
			});
	}]);
	return base;
});