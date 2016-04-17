define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		$scope.ownedCourses = Restangular.one('self').getList('courses').$object;
	}];
});