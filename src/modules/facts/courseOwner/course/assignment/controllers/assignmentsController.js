define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
		$scope.assignments = Restangular.one('courses', $stateParams.courseId).getList('assignments').$object;
	}];
});