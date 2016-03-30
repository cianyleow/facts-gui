define([], function() {
	'use strict';
	return ['$scope', 'base.services.authentication', function($scope, AuthenticationService) {
		
		$scope.user = {};
		
		$scope.authenticate = function(user) {	
			AuthenticationService.login(user, function(){});
		};
	}];
});