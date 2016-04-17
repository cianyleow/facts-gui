define([
		'./markingsController',
		'./markingDetailsController'
	],
	function(MarkingsController, MarkingDetailsController) {
		'use strict';
		return {
			init: function(module) {
				module.controller('facts.marker.marking.controllers.markings', MarkingsController);
				module.controller('facts.marker.marking.controllers.details', MarkingDetailsController);
			}
		};
	}
);