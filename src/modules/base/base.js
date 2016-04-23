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
		$urlRouterProvider.when('', '/dashboard');
		$urlRouterProvider.when('/', '/dashboard');
		$urlRouterProvider.otherwise('/dashboard');
		
		$stateProvider
			.state('authorize', {
				url: '/authorize',
				templateUrl: 'src/modules/base/partials/authorization.tpl.html',
				controller: 'base.controllers.authorization-controller'
			})
			.state('base', {
				abstract: true,
				templateUrl: 'src/modules/base/partials/framework.tpl.html',
				resolve: {
					'user':  ['base.services.user', '$log', '$http', '$state', function(UserService, $log, $http, $state) {
						return $http.get('api/self').then(function(_user) {
							UserService.setUser(_user);
							return _user;
						}, function(response) {
							if(response.status === 401 || response.status === 403) {
								$log.info('User is unauthorized, redirecting to authorize state.');
								$state.go('authorize');
							} else {
								$log.error('Unexpected error from backend');
							}
						});
					}]
				}
			})
			.state('base.app', {
				abstract: true,
				views: {
					root: {
						templateUrl: 'src/modules/base/partials/app.tpl.html'
					},
					sidenav: {
						templateUrl: 'src/modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.student.controller'
					},
					toolbar: {
						templateUrl: 'src/modules/base/partials/toolbar.tpl.html',
						controller: 'base.controllers.toolbar-controller'
					}
				}
			})
			.state('base.app.courseOwner', {
				url: '/courseOwner',
				abstract: true,
				views: {
					'sidenav@base': {
						templateUrl: 'src/modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.courseOwner.controller'
					},
				}
			})
			.state('base.app.marker', {
				url: '/marker',
				abstract: true,
				views: {
					'sidenav@base': {
						templateUrl: 'src/modules/base/partials/sidenav.tpl.html',
						controller: 'base.controllers.sidenav.marker.controller'
					},
				}
			});
	}]);
	return base;
});