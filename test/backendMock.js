define(['fixtures'], function(fixtures) {
    'use strict';
    return function($httpBackend) {
        function mockRoot(url) {
            $httpBackend.whenGET(url).respond(fixtures[url]);
        }

        function mockPost(url) {
            $httpBackend.whenPOST(url).respond(function(method, url, data) {
                return [201, data];
            });
        }

        function mockPatch(url) {
            var pattern = new RegExp('^' + url + '/\\d+$');
            $httpBackend.whenPATCH(pattern).respond(function(method, url, data) {
                return [200, data];
            });
        }

        function mockPut(url) {
            var pattern = new RegExp('^' + url + '/\\d+$');
            $httpBackend.whenPUT(pattern).respond(function(method, url, data) {
                return [200, data];
            });
        }

        // Actual mocking here
        // LOGIN
        $httpBackend.when('POST', /^api\/login/)
            .respond(function(method, url, data) {
                return [201, data, {'X-AUTH-TOKEN': 'asdf'}];
            });

        // SELF
        $httpBackend.when('GET', /^api\/self\/ownedCourses/)
            .respond(fixtures['api/courses']);
        $httpBackend.when('GET', /^api\/self\/markedCourses/)
            .respond(fixtures['api/courses']);
        $httpBackend.when('GET', /^api\/self\/enrolledCourses/)
            .respond(fixtures['api/courses']);
        $httpBackend.when('GET', /^api\/self\/notifications/)
            .respond(fixtures['api/notifications']);
        $httpBackend.when('GET', /^api\/self\/enrollments/)
            .respond(fixtures['api/enrollments']);

        // COURSES
        mockRoot('api/courses');
        mockPut('api/courses');
        $httpBackend.when('GET', /^api\/courses\/[\d]+$/)
            .respond(fixtures['api/courses'][0]);
        $httpBackend.when('POST', /^api\/courses\/[\d]+\/assignments$/)
            .respond(function(method, url, data) {
                return [201, data];
            });
        $httpBackend.when('GET', /^api\/courses\/[\d]+\/enrollments$/)
            .respond(fixtures['api/enrollments']);
        $httpBackend.when('GET', /^api\/courses\/[\d]+\/admin$/)
            .respond(fixtures['api/courses'][0]);
        $httpBackend.when('PUT', /^api\/courses\/[\d]+\/admin$/)
            .respond(function(method, url, data) {
               return [200, data];
            });
        $httpBackend.when('POST', /^api\/courses\/[\d]+\/announcements$/)
            .respond(function(method, url, data) {
                return [201, data];
            });
        $httpBackend.when('GET', /^api\/courses\/[\d]+\/enrollment$/)
            .respond(fixtures['api/enrollments'][0]);

        // ENROLLMENTS
        mockPut('api/enrollments');
        $httpBackend.whenDELETE(/^api\/enrollments\/[\d]+/)
            .respond(200);

        // FEEDBACK
        $httpBackend.when('GET', /^api\/feedback\/[\d]+$/)
            .respond(fixtures['api/feedback'][0]);

        // SUBMISSIONS
        $httpBackend.when('GET', /^api\/submissions\/[\d]+$/)
            .respond(fixtures['api/submissions'][0]);
        $httpBackend.when('GET', /^api\/submissions\/[\d]+\/submissionFiles/)
            .respond(fixtures['api/files']);

        // ASSIGNMENTS
        mockRoot('api/assignments');
        mockPost('api/assignments');
        mockPatch('api/assignments');
        $httpBackend.when('GET', /^api\/assignments\/[\d]+$/)
            .respond(fixtures['api/assignments'][0]);
        $httpBackend.when('GET', /^api\/assignments\/[\d]+\/submissions+$/).
            respond(fixtures['api/submissions']);

        // Files
        $httpBackend.when('GET', /^api\/files\/[\d]+\/link$/)
            .respond({link: 'link'});

        // TEMPLATES - Just return a blank template.
        $httpBackend.whenGET(/^.*\.tpl\.html$/).respond(
            [200, '<div></div>']
        );

    };
});