define([], function() {
	'use strict';
	return['$scope', '$interval', '$mdDialog', '$state', '$stateParams', 'base.services.dialog', 'base.services.file', 'Restangular', 'facts.services.submission', function($scope, $interval, $mdDialog, $state, $stateParams, DialogService, FileService, Restangular, SubmissionService) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
					
		$scope.submission = {
			comments: '',
			submissionFiles: []
		};
		
		$scope.removeUploadedFile = function(targetEvent, requiredFile) {
			if(requiredFile.hasOwnProperty('file')) {
				var confirm = $mdDialog.confirm().title('Remove Submission File')
				.textContent('Remove submission file: ' + requiredFile.file.name + '?')
				.ariaLabel('Remove submission file')
				.targetEvent(targetEvent)
				.ok('Remove')
				.cancel('Cancel')
				$mdDialog.show(confirm)
				.then(function() {
					requiredFile.file = undefined;
				});
			}
		};
		
		$scope.uploadRequiredFile = function(targetEvent, requiredFile) {
			DialogService.showCustomDialog(function($scope, $mdDialog) {
				$scope.requiredFile = requiredFile;
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				
				$scope.check = function(file) {
					$mdDialog.hide(file);
				}
			}, 'modules/facts/student/course/assignment/submission/partials/new.submissionFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(file) {
				requiredFile.file = file;
			}, function() {
				
			});
		};
		
		$scope.sendSubmission = function() {
			$scope.errorMessages = [];
			$scope.submitting = true;
			$scope.submitted = false;
			
			$scope.submission.files = [];
			
			// Upload files and get back fileIds
			angular.forEach($scope.requiredFiles, function(file) {
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
			var canSubmit = $scope.requiredFiles;
			angular.forEach($scope.requiredFiles, function(file) {
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