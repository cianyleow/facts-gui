define(['./bytes', './afterNow'], function(bytes, afterNow) {
	'use strict';
	return {
		init: function(module) {
			module.filter('bytes', bytes);
			module.filter('afterNow', afterNow);
		}
	};
});