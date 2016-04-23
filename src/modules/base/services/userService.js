define([], function() {
    'use strict';
    return [function() {
        var user;

        var userLevels = {
            ROLE_ADMIN: 0,
            ROLE_COURSE_OWNER: 1,
            ROLE_MARKER: 2,
            ROLE_STUDENT: 3
        };

        return {
            setUser: function(_user) {
                user = _user;
            },

            getUser: function() {
                return user;
            }
        };
    }];
});