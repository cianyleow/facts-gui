define([], function () {
    'use strict';
	function beforeNowFilter() {
		return function (items) {
			var fromDate = new Date();
			var result = [];
			if(items !== undefined && items.length !== 0) {
				for(var i = 0; i < items.length; i++) {
					var checkDate = new Date(items[i].dueTime);
					if(checkDate <= fromDate) {
						result.push(items[i]);
					}
				}
			}
			return result;
		};
	}
	return beforeNowFilter;
});