define([], function() {
    'use strict';
    return [function() {
        var userLevels = {
            ROLE_ADMIN: 0,
            ROLE_COURSE_OWNER: 1,
            ROLE_MARKER: 2,
            ROLE_STUDENT: 3

        };
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