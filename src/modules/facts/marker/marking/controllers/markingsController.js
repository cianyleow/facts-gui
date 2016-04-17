define([], function() {
	'use strict';
	return['$scope', function($scope) {
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