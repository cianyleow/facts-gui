define([], function() {
	'use strict';
	return['$scope', '$state', 'base.services.dialog', '$stateParams', 'facts.services.assignment', 'Upload', function($scope, $state, DialogService, $stateParams, AssignmentService, Upload) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.submission = {};
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
			var upload = Upload.upload({
				url: 'http://localhost:8080/submissions/new',
				data: {files: $scope.files, otherInfo: {assignmentId: $stateParams.assignmentId, comment: $scope.submission.comments}}
			}).then(function(resp) {
				console.log('Going to submission details with submission ID: ' + resp.data);
				$state.go('app.courses.details.assignments.details.submissions.details{submissionId: ' + resp.data);
			}, function(resp) {
				$scope.errorMessage = 'Error while uploading: ' + resp.statusText + " (" + resp.status + ")";
				DialogService.showErrorDialog('Submission Upload Error', 'There has been an error while uploading your submission. Please review and try again.');
				$scope.submitted = false;
				$scope.error = true;
			}, function(evt) {
				console.log(evt);
//				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		};
		
		$scope.isValid = function(file) {
			file.valid = file.selectedFile.size <= file.maxSize && getFileName(file.selectedFile.name) == file.name && file.type.indexOf(getFileExtension(file.selectedFile.name)) > -1;
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