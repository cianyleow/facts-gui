define([], function() {
	'use strict';
	return['$scope', 'Restangular', function($scope, Restangular) {
		$scope.submissions = [
		{
			assignment: {
				name: 'First assignment'
			},
			creationTime: '22-03-2016',
			submissionStatus: 'ONTIME'
		}
		];
	}];
});