define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'base.services.piechart', '$window', function($scope, $stateParams, Restangular, PieChartService, $window) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
		$scope.suppliedFiles = assignment.getList('suppliedFiles').$object;
		$scope.markComponentOptions =  {thickness: 50};
		$scope.markComponentData = [];
		$scope.markComponents = assignment.getList('markComponents').then(function(data) {
			$scope.markComponentData = PieChartService.getPieChartLines(data);
		});
		
		$scope.download = function(fileId) {
			Restangular.one('files', fileId).one('link').get().then(function(fileLink) {
				$window.open('http://localhost:8080/files/' + fileLink.link + '/download');
			});
		}
	}];
});