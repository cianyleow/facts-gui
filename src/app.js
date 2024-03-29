define(['angular', 'angular-material', 'angular-ui-breadcrumbs', 'angular-ui-title', 'restangular', 'angular-ui-router', 'ng-file-upload', 'angular-material-data-table', 'modules/facts/facts', 'modules/base/base', 'ng-messages'
], function(angular) {
	'use strict';
	var configFn = ['ui.router', 'md.data.table', 'ngFileUpload', 'base', 'facts', 'restangular', 'ngMaterial', 'angularUtils.directives.uiBreadcrumbs', 'ui.router.title', 'ngMessages'];
	var app = angular.module('app', configFn);
	
	app.config(['RestangularProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider',
		function(RestangularProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');

			$mdThemingProvider.theme('success-toast');
			$mdThemingProvider.theme('error-toast');
			
			RestangularProvider.setBaseUrl('api');
			
			// We can not inject $state directly as this gives a circular dependency
            $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
                return {
					request: function(config) {
						var authToken = $injector.get('base.services.token').retrieve();
						if(authToken) {
							config.headers['X-AUTH-TOKEN'] = authToken;
						}
						return config;
					},
                    responseError: function(response) {
                        if(response.config.url != 'api/login' && (response.status === 401 || response.status === 403)) {
							$injector.get('base.services.token').clear();
                            $injector.get('$state').transitionTo('authorize');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
        }
	]);
    return app;
});