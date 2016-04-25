define([], function() {
    'use strict';
    return [function() {
        var defaultStates = [
            'base.app.admin.dashboard',
            'base.app.courseOwner.dashboard',
            'base.app.marker.dashboard',
            'base.app.dashboard'
        ];

        return {
            defaultState: function(user) {
                if(user === null) {
                    return 'authorize';
                } else {
                    return defaultStates[2];
                }
            }
        };
    }];
});