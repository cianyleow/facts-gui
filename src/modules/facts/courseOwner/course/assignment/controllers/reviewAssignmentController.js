define([], function() {
	'use strict';
	return['$scope', 'Restangular', '$state', '$stateParams', '$q', 'base.services.file', 'base.services.piechart', 'facts.services.assignment', function($scope, Restangular, $state, $stateParams, $q, FileService, PieChartService, AssignmentService) {
		if(!AssignmentService.hasAssignmentForReview()) {
			$state.go('base.app.courseOwner.courses.details.assignments.new');
		}
		$scope.assignment = AssignmentService.getAssignmentForReview();
		$scope.markComponentData = PieChartService.getPieChartLines($scope.assignment.markComponents);
		$scope.markComponentOptions = {thickness: 30};
		
		$scope.create = function(assignment) {
			$scope.error = undefined;
			$scope.uploading = true;
			// Create Promise that can be cancelled.
			$scope.canceler = $q.defer();
			// Create assignment
			var baseAssignment = angular.copy(assignment);
			baseAssignment.groupBased = undefined;
			baseAssignment.suppliedFiles = undefined;
			var fd = new FormData();
			fd.append('assignment', JSON.stringify(baseAssignment));
			angular.forEach(assignment.suppliedFiles, function(suppliedFile) {
				fd.append('files', suppliedFile.file);
			});
			
			Restangular.one('courses', $stateParams.courseId).all('assignments').withHttpConfig({timeout: $scope.canceler.promise, transformRequest: angular.identity}).customPOST(fd, undefined, undefined, {'Content-Type': undefined}).then(function(_assignment) {
				$scope.uploading = false;
				$scope._assignment = _assignment;
				$scope.canceler.reject();
			}, function(_error) {
				$scope.uploading = false;
				$scope.canceler.reject();
				$scope.error = {message: errorCodes[_error.status]};
			});
		};

		var errorCodes = {
			413: 'Attachments are too large for upload. Max combined upload size is 10Mb.',
			500: 'Unspecified server error, please contact administrator.'
		};

		$scope.cancel = function(canceler) {
			$scope.uploading = false;
			if(canceler) {
				canceler.resolve('Cancelled request');
			}
		};
	}];
});