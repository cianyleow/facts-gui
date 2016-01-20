define([], function() {
	'use strict';
	return ['$scope', 'Restangular', function($scope, Restangular) {
		$scope.students = [];
		var studentsBase = Restangular.allUrl('students');
		studentsBase.getList().then(function(students) {
			$scope.students = students;
		});
	}];
});