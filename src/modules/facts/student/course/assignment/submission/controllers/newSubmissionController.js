define([], function() {
	'use strict';
	return['$scope', '$mdDialog', '$state', '$stateParams', 'base.services.dialog', 'base.services.file', 'Restangular', function($scope, $mdDialog, $state, $stateParams, DialogService, FileService, Restangular) {
		var assignment = Restangular.one('assignments', $stateParams.assignmentId);
		$scope.assignment = assignment.get().$object;
		
		$scope.requiredFiles = assignment.getList('requiredFiles').$object;
					
		$scope.submission = {
			comment: '',
			submissionFiles: []
		};
		
		$scope.removeSubmissionFile = function(targetEvent, submissionFile, index) {
			var confirm = $mdDialog.confirm().title('Remove Submission File')
			.textContent('Remove submission file: ' + submissionFile.file.name + '?')
			.ariaLabel('Remove submission file')
			.targetEvent(targetEvent)
			.ok('Remove')
			.cancel('Cancel');
			$mdDialog.show(confirm)
			.then(function() {
				$scope.submission.submissionFiles.splice(index, 1);
				submissionFile.file = undefined;
				$scope.requiredFiles.push(submissionFile);
			});
		};
		
		$scope.addSubmissionFile = function(targetEvent, requiredFile, index) {
			DialogService.showCustomDialog(function($scope, $mdDialog) {
				$scope.requiredFile = requiredFile;
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				
				$scope.add = function(file) {
					$mdDialog.hide(file);
				};
			}, 'modules/facts/student/course/assignment/submission/partials/new.submissionFileDialog.tpl.html', angular.element(document.body), targetEvent,
			function(file) {
				$scope.requiredFiles.splice(index, 1);
				requiredFile.file = file;
				$scope.submission.submissionFiles.push(requiredFile);
			}, function() {
				
			});
		};
		
		$scope.submit = function(submission) {
			var baseSubmission = angular.copy(submission);
			baseSubmission.submissionFiles = undefined;
			var fd = new FormData();
			fd.append('submission', JSON.stringify(baseSubmission));
			angular.forEach(submission.submissionFiles, function(submissionFile) {
				fd.append('files', submissionFile.file);
			});
			
			Restangular.one('assignments', $stateParams.assignmentId).all('submissions').withHttpConfig({transformRequest: angular.identiy}).customPOST(fd, undefined, undefined, {'Content-Type': undefined}).then(function(_submission) {
				console.log(_submission);
			});
		};
	}];
});