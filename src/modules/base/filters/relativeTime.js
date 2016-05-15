define([], function() {
    'use strict';

	var relativeTimeFilter = ['$filter', function($filter) {
		return function (date) {
			var currentDate = new Date();
			var timeDiff = currentDate - date;
			var seconds = Math.round(timeDiff / 1000);
			if(seconds < 60) {
				return 'just now';
			} else if(seconds >= 60 && seconds < 120) {
				return 'a minute ago';
			} else if(seconds >= 120 && seconds < 3600) {
				var currDate = new Date(date);
				return Math.round(seconds / 60) + ' minutes ago';
			} else if(seconds >= 3600 &&  seconds < 86400) {
				return Math.round(seconds / 3600) + ' hours ago';
			} else if(seconds >= 86400) {
				return 'on ' + $filter('date')(currDate, 'dd MMM, yyyy');
			}
		};
	}];
	return relativeTimeFilter;
});