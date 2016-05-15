define(['./bytes', './afterNow', './beforeNow', './relativeTime'], function(bytes, afterNow, beforeNow, relativeTime) {
	'use strict';
	return {
		init: function(module) {
			module.filter('bytes', bytes);
			module.filter('afterNow', afterNow);
			module.filter('beforeNow', beforeNow);
			module.filter('relativeTime', relativeTime);
		}
	};
});