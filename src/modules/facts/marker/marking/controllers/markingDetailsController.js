define([], function() {
	'use strict';
	return['Restangular', '$scope', '$stateParams', '$mdDialog', '$mdToast', function(Restangular, $scope, $stateParams, $mdDialog, $mdToast) {
		var feedback = Restangular.one('feedback', $stateParams.feedbackId);
		feedback.get().then(function(_feedback) {
			$scope.feedback = _feedback;
			$scope.mark = _feedback.mark;
		});

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
			$mdDialog.show($mdDialog.confirm()
				.title((_feedback.markReleased ? 'Release' : 'Hide') + ' Marks')
				.textContent('Are you sure you want to ' + (_feedback.markReleased ? 'release' : 'hide') + ' the marks?')
				.ariaLabel((_feedback.markReleased ? 'Release' : 'Hide') + ' Marks')
				.ok(_feedback.markReleased ? 'Release' : 'Hide')
				.cancel('Cancel')
			).then(function() {
				var alteredFeedback = {
					markReleased: _feedback.markReleased
				};
				feedback.customPUT(alteredFeedback).then(function (_feedback) {
					$scope.feedback.markReleased = _feedback.markReleased;
					$mdToast.show($mdToast.simple().textContent(_feedback.markReleased ? 'Mark released.' : 'Mark hidden.').position('top right'));
				}, function () {
					$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
					_feedback.markReleased = !_feedback.markReleased;
				});
			}, function() {
				_feedback.markReleased = !_feedback.markReleased;
			}).finally(function() {
				$scope.markReleasedRequest = false;
			});
		};

		$scope.changeCommentReleased = function(_feedback) {
			$scope.commentReleased = true;
			$mdDialog.show($mdDialog.confirm()
				.title((_feedback.commentReleased ? 'Release' : 'Hide') + ' Comments')
				.textContent('Are you sure you want to ' + (_feedback.markReleased ? 'release' : 'hide') + ' the comments?')
				.ariaLabel((_feedback.commentReleased ? 'Release' : 'Hide') + ' Comments')
				.ok(_feedback.commentReleased ? 'Release' : 'Hide')
				.cancel('Cancel')
			).then(function() {
				var alteredFeedback = {
					commentReleased: _feedback.commentReleased
				};
				feedback.customPUT(alteredFeedback).then(function (_feedback) {
					$scope.feedback.commentReleased = _feedback.commentReleased;
					$mdToast.show($mdToast.simple().textContent(_feedback.commentReleased ? 'Comment released.' : 'Comment hidden.').position('top right'));
				}, function () {
					$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
					_feedback.commentReleased = !_feedback.commentReleased;
				});
			}, function() {
				_feedback.commentReleased = !_feedback.commentReleased;
			}).finally(function() {
				$scope.commentReleasedRequest = false;
			});
		};

		$scope.changeFeedbackStatus = function(_feedback, oldFeedbackStatus) {
			if(_feedback.feedbackStatus != oldFeedbackStatus) {
				$scope.feedbackStatusRequest = true;
				$mdDialog.show($mdDialog.confirm()
					.title('Change Feedback Status')
					.textContent('Are you sure you want to change the feedback status from ' + oldFeedbackStatus + ' to ' + _feedback.feedbackStatus + '?')
					.ariaLabel('Change feedback status')
					.ok('Change')
					.cancel('Cancel')
				).then(function() {
					var alteredFeedback = {
						feedbackStatus: _feedback.feedbackStatus
					};
					feedback.customPUT(alteredFeedback).then(function (_feedback) {
						$scope.feedback.feedbackStatus = _feedback.feedbackStatus;
						$mdToast.show($mdToast.simple().textContent('Feedback status change from ' + oldFeedbackStatus + ' to ' + _feedback.feedbackStatus + '.').position('top right'));
					}, function () {
						$mdToast.show($mdToast.simple().textContent('Failed to update comment released.').position('top right'));
						_feedback.feedbackStatus = oldFeedbackStatus;
					});
				}, function() {
					_feedback.feedbackStatus = oldFeedbackStatus;
				}).finally(function() {
					$scope.feedbackStatusRequest = false;
					$scope.oldFeedbackStatus = undefined;
				});
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
			}, function() {
				$scope.mark = $scope.feedback.mark;
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