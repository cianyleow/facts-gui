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
			assignmentId: $stateParams.assignmentId
		};
		
		$scope.sendSubmission = function() {
			$scope.errorMessages = [];
			$scope.submitting = true;
			$scope.submitted = false;
			$scope.uploading = true;
			$scope.uploads = [];
			
			var uploadPromises = [];
			
			// Upload files and get back fileIds
			angular.forEach($scope.assignment.requiredFiles, function(file, index) {
				var currentFile = {
					fileName: file.selectedFile.name,
					progress: 0
				};
				$scope.uploads.push(currentFile);
				uploadPromises.push(FileService.uploadFile(
					file.selectedFile,
					function(resp) {
						console.log(resp);
						$scope.submission.fileIds[index] = resp.data.fileId;
						currentFile.uploaded = true;
					},
					function(resp) {
						$scope.errorMessages.push(resp.data.message);
						resetForm();
					}, function(evt) {
						currentFile.progress = Math.floor(evt.loaded / evt.total * 100);
					}
				));	
			});
			$q.all(uploadPromises).then(function() {
				if($scope.errorMessages.length === 0) { // Only upload submission if no errors.
					$scope.uploading = false;
					SubmissionService.uploadNewSubmission(
						$scope.submission, 
						function(resp) {
							console.log("Finished submission");
							$scope.submitted = true;
							$scope.timeLeft = 3;
							redirectPage(resp);
						},
						function(resp) {
							$scope.errorMessages.push(resp.message);
						}
					);
				}
				if($scope.errorMessages.length !== 0) {
					DialogService.showErrorDialog('Submission Upload Error', 'There has been an error while uploading your submission. Please review and try again.');
					$scope.submitted = false;
				}
			});
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
		
		function resetForm() {
			$scope.submitting = false;
			$scope.submitted = false;
			$scope.uploading = false;
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