define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'E',
			templateUrl: 'modules/facts/directives/assignment-calendar.tpl.html',
			scope: {
				courseId: '=',
				assignmentsList: '='
			},
			controller: ['$scope', '$log', function($scope, $log) {
				$log.debug('Course ID: ' + $scope.courseId);
				Date.prototype.addDays = function(days) {
					var dat = new Date(this.valueOf());
					dat.setDate(dat.getDate() + days);
					return dat;
				}
				var today = new Date();
				$scope.startDate = new Date(2016, 0, 11, 0, 0, 0);
				var currentDate = new Date($scope.startDate);
				
				$scope.endDate = new Date(2016, 2, 25, 0, 0, 0);
				$scope.dateArray = [];
				var i = 0;
				var weekArray = [];
				while(currentDate <= $scope.endDate) {
					var item = [];
					item.date = new Date(currentDate);
					if(currentDate.getDate() == today.getDate() && currentDate.getMonth() == today.getMonth()) {
						item.today = true;
					}
					weekArray.push(item);
					currentDate = new Date(currentDate.addDays(1));
					if(i % 7 == 6) {
						$scope.dateArray.push(weekArray);
						weekArray = [];
					}
					i++;
				}
			}],
			link: function(scope, el, attrs) {
				scope.$watch('assignmentsList', function(assignmentsList) {
					if(assignmentsList) {
						var i;

						var toRemove = [];
//						assignmentsList[0].dueDate = new Date(2016, 0, 22, 0, 0, 0);
						var daysDifference = function(startDate, endDate) {
							var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
							return Math.ceil(timeDiff / (1000 * 3600 * 24));
							
						}
						for(i = 0; i < assignmentsList.length; i++) {
							assignmentsList[i].dueDate = new Date(2016, 0, 11 + i * 8, 0, 0, 0);
							if(assignmentsList[i].dueDate < scope.startDate || assignmentsList[i].dueDate > scope.endDate) {
								toRemove.push(i);
							} else {
								assignmentsList[i].assignmentNumber = i+1;
								var daysDiff = daysDifference(scope.startDate, assignmentsList[i].dueDate);
								var weeksDiff = Math.floor(daysDiff / 7);
								daysDiff = daysDiff % 7;
								scope.dateArray[weeksDiff][daysDiff].assignment = assignmentsList[i];
							}
						}
					}
				}, true);
			}
		};
	}];
});
