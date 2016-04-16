define([], function() {
	'use strict';
	return['$scope', '$q', '$interval', '$timeout', '$state', '$stateParams', 'base.services.dialog', 'base.services.file', 'facts.services.assignment', 'facts.services.submission', function($scope, $q, $interval, $timeout, $state, $stateParams, DialogService, FileService, AssignmentService, SubmissionService) {
		$scope.assignment = AssignmentService.getAssignment($stateParams.assignmentId);
		$scope.errorMessages = [];
		
		$scope.secondForms = {
			0: '0 seconds',
			one: '{} second',
			other: '{} seconds'
		};
		
		$scope.submitted = false;
		
		$scope.submission = {
			comments: '',
			fileIds: [],
			assignment_id: $stateParams.assignmentId
		};
		
		$scope.sendSubmission = function() {
			$scope.errorMessages = [];
			$scope.submitting = true;
			$scope.submitted = false;
			
			$scope.submission.files = [];
			
			// Upload files and get back fileIds
			angular.forEach($scope.assignment.requiredFiles, function(file) {
				$scope.submission.files.push(file.selectedFile);
			});
			SubmissionService.uploadNewSubmission(
				$scope.submission, 
				function(resp) {
					console.log("Finished submission");
					$scope.submitted = true;
					$scope.timeLeft = 3;
					redirectPage(resp.data.submissionId);
				},
				function(resp) {
					$scope.errorMessages.push(resp.message);
					DialogService.showErrorDialog('Submission Upload Error', 'There has been an error while uploading your submission. Please review and try again.');
					$scope.submitted = false;
				}
			);
		};
		
		$scope.isValid = function(file) {
			var valid = file.selectedFile.size <= file.maximumSize;
			valid = valid && getFileName(file.selectedFile.name) == file.fileName;
			valid = valid && objectArrayContains(file.allowedExtensions, function(elem) {
				return elem.fileType;
			}, getFileExtension(file.selectedFile.name));
			file.valid = valid;
			file.valid = true;
			return file.valid;
		};
		
		$scope.canSubmit = function() {
			var canSubmit = $scope.assignment.requiredFiles;
			angular.forEach($scope.assignment.requiredFiles, function(file) {
				canSubmit = canSubmit && file.selectedFile && file.valid;
			});
			return canSubmit;
		};
		
		function objectArrayContains(array, accessor, value) {
			var i = 0;
			for(i = 0; i < array.length; i++) {
				if(accessor(array[i]) == value) {
					return true;
				}
			}
			return false;
		}
		
		function getFileName(fileName) {
			return fileName.split('.')[0];
		}
		
		function getFileExtension(fileName) {
			return fileName.split('.')[1];
		}
		
		function redirectPage(submissionId) {
			$interval(
				function() {
					$scope.timeLeft--;
					if($scope.timeLeft === 0) {
						$state.go('app.courses.details.assignments.details.submissions.details', {submissionId: submissionId});
					}
				}, 
				1000, 
				3
			);
		}
	}];
});