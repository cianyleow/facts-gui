define(['./bytes', './afterNow', './beforeNow'], function(bytes, afterNow, beforeNow) {
	'use strict';
	return {
		init: function(module) {
			module.filter('bytes', bytes);
			module.filter('afterNow', afterNow);
			module.filter('beforeNow', beforeNow);
		}
	};
});