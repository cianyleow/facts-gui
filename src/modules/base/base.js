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
		// Redirect to correct dashboard based on user/user preferences.
		$urlRouterProvider.when('/', ['base.services.token', 'base.services.user', '$state', function(TokenService, UserService, $state) {
			var user = TokenService.userInfo();
			if(user === null || user.defaultState === null) {
				$state.go('authorize');
			} else {
				$state.go(user.defaultState);
			}
		}]);

		$urlRouterProvider.otherwise('/dashboard');
		
		$stateProvider
			.state('authorize', {
				url: '/authorize?redirect',
				params: {
					'redirect': null,
					'logout': false
				},
				templateUrl: 'src/modules/base/partials/authorization.tpl.html',
				controller: 'base.controllers.authorization-controller'
			})
			.state('base', {
				abstract: true,
				templateUrl: 'src/modules/base/partials/framework.tpl.html'
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
				},
				resolve: {
					'user':  ['base.services.authentication', '$log', '$state', '$location', '$q', function(AuthenticationService, $log, $state, $location, $q) {
						return AuthenticationService.check().then(function(user) {
							return user;
						}, function(message) {
							$log.info('User is not authenticated (' + message +'), redirecting to authorize state.');
							$state.go('authorize', {redirect: $location.url()});
							return $q.reject();
						});
					}]
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