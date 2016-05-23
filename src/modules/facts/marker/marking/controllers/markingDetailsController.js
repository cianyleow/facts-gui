define([], function() {
	'use strict';
	return['Restangular', '$scope', '$stateParams', 'base.services.dialog', '$mdToast', function(Restangular, $scope, $stateParams, DialogService, $mdToast) {
		var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		feedback.get().then(function(_feedback) {
			$scope.feedback = _feedback;
			$scope.mark = _feedback.mark;
			$scope.feedback.assignment = Restangular.one('assignments', _feedback.submission.assignment.assignmentId).get().$object;
		});

		// var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		// feedback.get().then(function(_feedback) {
		// 	$scope.feedback = _feedback;
		// 	// Then decorate the mark on that object.
		// 	feedback.one('mark').get().then(function(_mark) {
		// 		$scope.feedback.mark = _mark;
		// 		$scope.mark = _mark;
		// 	});
		// });
		// feedback.one('submission').get().then(function(_submission) {
		// 	$scope.submission = _submission;
		// 	Restangular.one('submissions', _submission.submissionId).getList('submissionFiles').then(function(_files) {
		// 		$scope.submissionFiles = _files;
		// 	});
		// 	Restangular.one('submissions', _submission.submissionId).one('assignment').get().then(function(_assignment) {
		// 		$scope.assignment = _assignment;
		// 		Restangular.one('assignments', _assignment.assignmentId).getList('suppliedFiles').then(function(_suppliedFiles) {
		// 			$scope.suppliedFiles = _suppliedFiles;
		// 		});
		// 	});
		// });
		// $scope.comments = feedback.getList('comments').$object;

		$scope.editComment = function(comment) {
			comment.newComment = angular.copy(comment);
			comment.editMode = true;
		};

		$scope.cancelComment = function(comment) {
			comment.editMode = false;
			comment.newComment = undefined;
		};

		$scope.deleteComment = function(comment, idx) {
			Restangular.one('comments', comment.commentId).remove().then(function() {
				$scope.feedback.comments.splice(idx, 1);
				$mdToast.show($mdToast.simple().textContent('Comment #' + comment.commentId + ' deleted!').position('top right'));
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Comment failed to delete!'));
			});
		};

		$scope.saveComment = function(comment, idx) {
			if(comment.new) {
				feedback.all('comments').post(comment.newComment).then(function(_comment) {
					$scope.feedback.comments[idx] = _comment;
					$mdToast.show($mdToast.simple().textContent('Comment created!'));
				});
			} else {
				feedback.one('comments', comment.commentId).put(comment.newComment).then(function(_comment) {
					$scope.feedback.comments[idx] = _comment;
					$mdToast.show($mdToast.simple().textContent('Comment updated!'));
				});
			}

		};

		$scope.cancelMark = function() {
			$scope.mark = $scope.feedback.mark;
		};

		$scope.saveMark = function(mark) {
			var alteredFeedback = {
				mark: mark
			};
			feedback.customPUT(alteredFeedback).then(function(_feedback) {
				$scope.feedback = _feedback;
				$scope.mark = _feedback.mark;
					$mdToast.show($mdToast.simple().textContent('Mark updated to ' + _feedback.mark + '.').position('top right'));
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Failed to update mark.').position('top right'));
			});
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
				action: function() {
					$scope.feedback.comments.push({
						comment: '',
						secret: false,
						newComment: {
							comment: '',
							secret: false
						},
						editMode: true,
						new: true
					});
				}
			}
		];
	}];
});