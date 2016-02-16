define([], function() {
	'use strict';
	return['$scope', '$stateParams', 'Restangular', 'facts.services.assignment', function($scope, $stateParams, Restangular, AssignmentService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.files = [
			{
				name: 'presentation',
				type: ['pdf', 'ppt', 'pptx'],
				maxSize: 10000000
			},
			{
				name: 'writeup',
				type: ['pdf', 'docx', 'doc'],
				maxSize: 5000000
			}
		];
		
		$scope.sendSubmission = function() {
			$scope.submitted = true;
		};
		
		$scope.isValid = function(file) {
			file.valid = file.selectedFile.size <= file.maxSize && getFileName(file.selectedFile.name) == file.name && file.type.indexOf(getFileExtension(file.selectedFile.name)) > -1
			return file.valid;
		};
		
		$scope.canSubmit = function() {
			var canSubmit = true;
			angular.forEach($scope.files, function(file) {
				canSubmit = canSubmit && file.valid;
			});
			return canSubmit;
		};
		
		function getFileName(fileName) {
			return fileName.split('.')[0];
		}
		
		function getFileExtension(fileName) {
			return fileName.split('.')[1];
		}
	}];
});