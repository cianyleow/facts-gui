define([], function() {	'use strict';	return ['$http', 'base.services.token', '$state', function($http, TokenService, $state) {		var service = this;				service.login = function(user, errorCallback) {			var url = '/login';			$http.post(url, {username: user.username, password: user.password}).then(function(response) {				TokenService.store(response.headers('X-AUTH-TOKEN'));				$state.transitionTo('base.app.dashboard');			}, function(response) {				errorCallback(response);			});		};				service.logout = function() {			return TokenService.clear();		};				return service;	}];});