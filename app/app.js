define(['angular', 'angular-material', 'angular-ui-breadcrumbs', 'angular-ui-title', 'angular-material-icons', 'restangular', 'angular-ui-router', 'ng-file-upload', 'angular-material-data-table', 'modules/facts/facts', 'modules/base/base'
], function(angular) {
	'use strict';
	var configFn = ['ui.router', 'md.data.table', 'ngFileUpload', 'base', 'facts', 'restangular', 'ngMaterial', 'ngMdIcons', 'angularUtils.directives.uiBreadcrumbs', 'ui.router.title'];
	var app = angular.module('app', configFn);
	
	app.config(['RestangularProvider', '$locationProvider', '$httpProvider',
		function(RestangularProvider, $locationProvider, $httpProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');
			
			RestangularProvider.setBaseUrl('http://localhost:8080');
			
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
                        if(response.status === 401 || response.status === 403) {
							$injector.get('base.services.token').clear();
                            $injector.get('$state').transitionTo('authorize');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
        }]);
	angular.bootstrap(document, ['app']);
    return app;
});