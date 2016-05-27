define([], function() {
	'use strict';
	return['Restangular', '$scope', '$stateParams', '$mdDialog', '$mdToast', function(Restangular, $scope, $stateParams, $mdDialog, $mdToast) {
		var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		feedback.get().then(function(_feedback) {
			$scope.feedback = _feedback;
			$scope.mark = _feedback.mark;
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
			if(comment.new) {
				$scope.feedback.comments.splice($scope.feedback.comments.indexOf(comment), 1);
			} else {
				comment.editMode = false;
				comment.newComment = undefined;
			}
		};

		$scope.changeMarkReleased = function(_feedback) {
			$scope.markReleasedRequest = true;
			var alteredFeedback = {
				markReleased: _feedback.markReleased
			};
			feedback.customPUT(alteredFeedback).then(function(_feedback) {
				$scope.feedback.markReleased = _feedback.markReleased;
				$mdToast.show($mdToast.simple().textContent(_feedback.markReleased ? 'Mark released.' : 'Mark hidden.').position('top right'));
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
				feedback.markReleased = !feedback.markReleased;
			}).finally(function() {
				$scope.markReleasedRequest = false;
			});
		};

		$scope.changeCommentReleased = function(_feedback) {
			$scope.commentReleasedRequest = true;
			var alteredFeedback = {
				commentReleased: _feedback.commentReleased
			};
			feedback.customPUT(alteredFeedback).then(function(_feedback) {
				$scope.feedback.commentReleased = _feedback.commentReleased;
				$mdToast.show($mdToast.simple().textContent(_feedback.commentReleased ? 'Comment released.' : 'Comment hidden.').position('top right'));
			}, function() {
				$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
				feedback.commentReleased = !feedback.commentReleased;
			}).finally(function() {
				$scope.commentReleasedRequest = false;
			});
		};

		$scope.changeFeedbackStatus = function(_feedback, oldFeedbackStatus) {
			if(_feedback.feedbackStatus != oldFeedbackStatus) {
				$scope.feedbackStatusRequest = true;
				var alteredFeedback = {
					feedbackStatus: _feedback.feedbackStatus
				};
				feedback.customPUT(alteredFeedback).then(function(_feedback) {
					$scope.feedback.feedbackStatus = _feedback.feedbackStatus;
					$mdToast.show($mdToast.simple().textContent('Feedback status change from ' + oldFeedbackStatus + ' to ' + _feedback.feedbackStatus + '.').position('top right'));
				}, function() {
					$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
					_feedback.feedbackStatus = oldFeedbackStatus;
				}).finally(function() {
					$scope.feedbackStatusRequest = false;
					$scope.oldFeedbackStatus = undefined;
				})
			}
		};

		$scope.deleteComment = function(comment, idx) {
			$mdDialog.show($mdDialog.confirm()
				.title('Delete Comment')
				.textContent('Are you sure you want to delete this comment?')
				.ariaLabel('Delete comment')
				.ok('Delete')
				.cancel('Cancel')
			).then(function() {
				Restangular.one('comments', comment.commentId).remove().then(function() {
					$scope.feedback.comments.splice(idx, 1);
					$mdToast.show($mdToast.simple().textContent('Comment #' + comment.commentId + ' deleted!').position('top right'));
				}, function() {
					$mdToast.show($mdToast.simple().textContent('Failed to delete comment.'));
				});
			});
		};

		$scope.saveComment = function(comment, idx) {
			$mdDialog.show($mdDialog.confirm()
				.title((comment.new ? 'Save New' : 'Update') + ' Comment')
				.textContent('Are you sure you want to ' + (comment.new ? 'save' : 'update') + ' this comment?')
				.ariaLabel((comment.new ? 'Save' : 'Update') + ' comment')
				.ok(comment.new ? 'Save' : 'Update')
				.cancel('Cancel')
			).then(function() {
				if (comment.new) {
					feedback.all('comments').post(comment.newComment).then(function (_comment) {
						$scope.feedback.comments[idx] = _comment;
						$mdToast.show($mdToast.simple().textContent('Comment created!'));
					}, function() {
						$mdToast.show($mdToast.simple().textContent('Failed to create mark.').position('top right'));
					});
				} else {
					Restangular.one('comments', comment.commentId).customPUT(comment.newComment).then(function (_comment) {
						$scope.feedback.comments[idx] = _comment;
						$mdToast.show($mdToast.simple().textContent('Comment updated!'));
					}, function() {
						$mdToast.show($mdToast.simple().textContent('Failed to update mark.').position('top right'));
					});
				}
			});
		};

		$scope.cancelMark = function() {
			$scope.mark = $scope.feedback.mark;
		};

		$scope.saveMark = function(mark) {
			$mdDialog.show($mdDialog.confirm()
				.title('Update Mark')
				.textContent('Are you sure you want to update this mark to ' + mark + '?')
				.ariaLabel('Update Mark')
				.ok('Update')
				.cancel('Cancel')
			).then(function() {
				var alteredFeedback = {
					mark: mark
				};
				feedback.customPUT(alteredFeedback).then(function (_feedback) {
					$scope.feedback.mark = _feedback.mark;
					$scope.mark = _feedback.mark;
					$mdToast.show($mdToast.simple().textContent('Mark updated to ' + _feedback.mark + '.').position('top right'));
				}, function () {
					$mdToast.show($mdToast.simple().textContent('Failed to update mark.').position('top right'));
				});
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