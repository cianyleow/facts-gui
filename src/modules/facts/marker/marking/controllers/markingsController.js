define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		$scope.feedback = Restangular.one('self').getList('marking').$object;
	}];
});