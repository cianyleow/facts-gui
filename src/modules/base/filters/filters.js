define(['./bytes', './afterToday'], function(bytes, afterToday) {
	'use strict';
	return {
		init: function(module) {
			module.filter('bytes', bytes);
			module.filter('afterToday', afterToday);
		}
	};
});