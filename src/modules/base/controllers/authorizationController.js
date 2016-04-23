define([], function() {
	'use strict';
	return ['$scope', 'base.services.authentication', '$stateParams', function($scope, AuthenticationService, $stateParams) {
		
		$scope.user = {};
		
		$scope.redirect = $stateParams.redirect;
		
		$scope.authenticate = function(user) {
			$scope.error = false;
			AuthenticationService.login(user, $scope.redirect, function(response){
				console.log('Authentication Error:' + response);
				$scope.error = true;
			});
		};
	}];
});