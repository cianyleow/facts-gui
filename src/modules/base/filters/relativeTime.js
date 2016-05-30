define([], function() {
    'use strict';

	var relativeTimeFilter = ['$filter', function($filter) {
		return function (date) {
			var test;
			var isInt = isNaN(date) ? !1 : (test = parseFloat(date), (0 | test) === test);
			if(date === undefined || !(date instanceof Date || isInt)) {
				return '';
			}
			var targetDate = new Date(date);
			var currentDate = new Date();
			var timeDiff = currentDate - date;
			var seconds = Math.round((timeDiff / 1000) - 0.5);
			if(seconds < -86400) {
				return 'on ' + $filter('date')(targetDate, 'dd MMM, yyyy');
			} else if(seconds <= -7200 && seconds > -86400) {
				return 'in ' + Math.round((-seconds / 3600) -0.5) + ' hours';
			} else if(seconds <= 0 && seconds > -7200) {
				return 'at ' + $filter('date')(targetDate, 'HH:mm');
			} else if(seconds >= 0 && seconds < 60) {
				return 'just now';
			} else if(seconds >= 60 && seconds < 120) {
				return 'a minute ago';
			} else if(seconds >= 120 && seconds < 3600) {
				return Math.round((seconds / 60) - 0.5) + ' minutes ago';
			} else if(seconds >= 3600 &&  seconds < 7200) {
				return 'an hour ago';
			} else if(seconds >= 7200 && seconds < 86400) {
				return Math.round((seconds / 3600) - 0.5) + ' hours ago';
			} else if(seconds >= 86400) {
				return 'on ' + $filter('date')(targetDate, 'dd MMM, yyyy');
			}
		};
	}];
	return relativeTimeFilter;
});