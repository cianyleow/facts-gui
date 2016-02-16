define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'E',
			templateUrl: 'modules/base/directives/submission-file-upload.tpl.html',
			scope: {
				files: '='
			},
			controller: ['$scope', function($scope) {

			}],
			link: ['$scope', function($scope, scope, element, attrs) {
				element.on('change', function(evt) {
					console.log('Change happened');
					var files = evt.target.files;
					console.log(files[0].size);
				});
			}]
		};
	}];
});
