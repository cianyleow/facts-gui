define([], function () {
    'use strict';
	function afterNowFilter() {
		return function (items) {
			var fromDate = new Date();
			var result = [];
			if(items != undefined && items.length != 0) { // Only do filtering if list exists.
				for (var i = 0; i < items.length; i++) {
					var checkDate = new Date(items[i].dueTime);
					if (checkDate > fromDate) {
						result.push(items[i]);
					}
				}
			}
			return result;
		};
	}
	return afterNowFilter;
});