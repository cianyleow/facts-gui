define([], function() {
	'use strict';
	return ['$scope', '$state', '$log', function($scope, $state, $log) {
		$scope.user =  {
			'name': 'Cian Leow',
			'cid': '00730596'
		};
		
		$scope.logout = function() {
			$log.debug('Logging out user');
			// Do something here to log the person out.
			$state.go('authorize');
		};
	}];
});