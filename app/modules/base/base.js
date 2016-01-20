define(['angular',
	'modules/base/controllers/controllers',
	'modules/base/directives/directives'
], function(angular, controllers, directives) {
	'use strict';
	var base = angular.module('base', []);
	controllers.init(base);
	directives.init(base);
	
	base.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
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
				breadcrumbValue: 'Home',
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
					},
					'mainContent@app': {
						templateUrl: 'modules/base/partials/enter.tpl.html'
					}
				},
				data: {
					displayName: 'Home'
				}
			});
	}]);
	
	return base;
});