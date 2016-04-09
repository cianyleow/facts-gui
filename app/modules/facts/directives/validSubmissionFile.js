define([], function() {
	'use strict';
	return [function() {
		return {
			restrict: 'A',
			
			require: 'ngModel',
			
			scope: {
				requiredFile: '='
			},
			
			link: function(scope, el, attrs, ngModel) {
				ngModel.$validators.validuploadsize = function(modelValue) {
					if(modelValue === undefined) {
						return true;
					} else {
						return modelValue.size <= scope.requiredFile.maxFileSize;
					}
				};
				
				ngModel.$validators.validfilename = function(modelValue) {
					console.log(modelValue);
					if(modelValue === undefined) {
						return true;
					} else {
						return modelValue.name === (scope.requiredFile.fileName + "." + scope.requiredFile.allowedExtension);
					}
				};
			}
		};
	}];
});
