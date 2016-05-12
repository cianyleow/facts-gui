define([], function () {
    'use strict';
	function afterTodayFilter() {
		return function (items) {
			var fromDate = new Date();
			var result = [];
			for(var i = 0; i < items.length; i++) {
				var checkDate = new Date(items[i].dueTime);
				if(checkDate > fromDate) {
					result.push(items[i]);
				}
			}
			return result;
		};
	}
	return afterTodayFilter;
});