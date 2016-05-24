define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', function($scope, $stateParams, Restangular) {
		Restangular.one('courses', $stateParams.courseId).get().then(function(_course) {
			$scope.assignments = _course.assignments;
		});
	}];
});