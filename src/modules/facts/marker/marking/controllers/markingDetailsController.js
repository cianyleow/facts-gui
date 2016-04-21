define([], function() {
	'use strict';
	return['Restangular', '$scope', '$stateParams', 'base.services.dialog', function(Restangular, $scope, $stateParams, DialogService) {
		var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		$scope.feedback = feedback.get().$object;
		feedback.one('submission').get().then(function(_submission) {
			$scope.submission = _submission;
			Restangular.one('submissions', _submission.submissionId).getList('submissionFiles').then(function(_files) {
				$scope.submissionFiles = _files;
			});
			Restangular.one('submissions', _submission.submissionId).one('assignment').get().then(function(_assignment) {
				$scope.assignment = _assignment;
				Restangular.one('assignments', _assignment.assignmentId).getList('markComponents').then(function(_markComponents) {
					$scope.marks = [];
					angular.forEach(_markComponents, function(_markComponent) {
						$scope.marks.push({markComponent: _markComponent});
					});
				});
				Restangular.one('assignments', _assignment.assignmentId).getList('suppliedFiles').then(function(_suppliedFiles) {
					$scope.suppliedFiles = _suppliedFiles;
				});
			});
		});
		$scope.comments = feedback.getList('comments').$object;
		$scope.marks = feedback.getList('marks').$object;

		$scope.saveMark = function(mark) {
			if(mark.newMark <= mark.markComponent.maxMark) {
				mark.mark = mark.newMark;
			}
			mark.newMark = undefined;
			mark.editMode = false;
		};

		$scope.submissionActions = [
			{
				description: 'Download files as ZIP',
				icon: 'folder',
				action: function() {
					console.log('Download as ZIP');
				}
			}
		];

		$scope.commentActions = [
			{
				description: 'Add Comment',
				icon: 'add',
				action: function(targetEvent) {
					DialogService.showCustomDialog(
						function($scope, $mdDialog) {
							$scope.comment = {
								secret: false
							};

							$scope.cancel = function() {
								$mdDialog.cancel();
							};

							$scope.check = function(comment) {
								$mdDialog.hide(comment);
							};
						}, 'src/modules/facts/marker/marking/partials/new.comment-dialog.tpl.html',
						angular.element(document.body), targetEvent,
						function(comment) {
							feedback.all('comments').post(comment).then(function(_comment) {
								$scope.comments.push(_comment);
							}, function(_comment) {
								console.log('Uhhh, error in send');
							})
						}, function() {

						});
				}
			}
		];
	}];
});