define(['./bytes'], function(bytes) {
	'use strict';
	return {
		init: function(module) {
			module.filter('bytes', bytes);
		}
	};
});