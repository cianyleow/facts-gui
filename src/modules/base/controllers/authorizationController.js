define([], function() {
	'use strict';
	return ['$scope', 'base.services.authentication', function($scope, AuthenticationService) {
		
		$scope.user = {};
		
		$scope.authenticate = function(user) {
			$scope.error = false;
			AuthenticationService.login(user, function(response){
				console.log('Authentication Error:' + response);
				$scope.error = true;
			});
		};
	}];
});