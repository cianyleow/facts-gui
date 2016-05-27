define([], function() {
    'use strict';
    return ['$mdDialog', '$compile', '$parse', function($mdDialog, $compile, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.ngClick);

                element.prop('ng-click', null).off('click');

                element.bind('click', function(e) {
                   e.stopImmediatePropagation();

                    console.log('Clicked');

                    $mdDialog.show(
                        $mdDialog.confirm()
                            .title(attrs.confirmTitle)
                            .textContent(attrs.confirmContent)
                            .ariaLabel('Confirmation dialog')
                            .targetEvent(e)
                            .ok(attrs.confirm)
                            .cancel('Cancel')
                    ).then(function() {
                        model(scope);
                    });
                });
            }
        };
    }];
});
