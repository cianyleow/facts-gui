define(['angular', 'angular-material', 'angular-ui-breadcrumbs', 'angular-ui-title', 'angular-material-icons', 'restangular', 'angular-ui-router', 'angular-upload', 'modules/facts/facts', 'modules/base/base'
], function(angular) {
	'use strict';
	var configFn = ['ui.router', 'lr.upload', 'base', 'facts', 'restangular', 'ngMaterial', 'ngMdIcons', 'angularUtils.directives.uiBreadcrumbs', 'ui.router.title'];
	var app = angular.module('app', configFn);
	
	app.config(['RestangularProvider', '$locationProvider', '$httpProvider',
		function(RestangularProvider, $locationProvider, $httpProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');
			
			RestangularProvider.setBaseUrl('http://localhost:8080');
			
			RestangularProvider.addResponseInterceptor(function(data, operation, route) {
                var returnData;
                if (operation === 'getList' && data._embedded) {
                    returnData = data._embedded[route];
                    /*
                     Fallback: if the returneddata does not contain the route key take the first one.
                     Example: data = { _embedded: { travelExpenses: [] } } but route = 'expenses'.
                     */
                    if (!returnData) {
                        returnData = data._embedded[Object.keys(data._embedded)[0]];
                    }
                    //if there is pagination info make it one-based.
                    if (data.page) {
                        returnData.page = data.page;
                        returnData.page.number = returnData.page.number + 1;
                    }
                } else if (operation === 'getList' && !data._embedded) {
                    returnData = [];
                    returnData.page = data.page;
                } else {
                    returnData = data;
                }
                return returnData;
            });
			
			// We can not inject $state directly as this gives a circular dependency
            $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
                return {
                    responseError: function(response) {
                        if(response.status === 401) {
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