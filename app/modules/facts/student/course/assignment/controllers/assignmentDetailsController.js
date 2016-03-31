define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'base.services.piechart', function($scope, $stateParams, Restangular, PieChartService) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.markComponentOptions =  {thickness: 50};
		$scope.markComponentData = [];
		$scope.markComponents = assignment.getList('markComponents').then(function(data) {
			$scope.markComponentData = PieChartService.getPieChartLines(data);
		});
	}];
});