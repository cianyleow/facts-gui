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

        // Actual mocking here
        // LOGIN
        $httpBackend.when('POST', /^api\/login/)
            .respond(function(method, url, data) {
                return [201, data, {'X-AUTH-TOKEN': 'asdf'}];
            });

        // COURSES
        $httpBackend.when('POST', /^api\/courses\/[\d]+\/assignments$/)
            .respond(function(method, url, data) {
                return [201, data];
            });

        // FEEDBACK
        $httpBackend.when('GET', /^api\/feedback\/[\d]+$/)
            .respond(fixtures['api/feedback'][0]);
        $httpBackend.when('GET', /^api\/feedback\/[\d]+\/submission+$/)
            .respond(fixtures['api/submissions'][0]);
        $httpBackend.when('GET', /^api\/feedback\/[\d]+\/marks+$/)
            .respond(fixtures['api/marks']);
        $httpBackend.when('GET', /^api\/feedback\/[\d]+\/comments+$/)
            .respond(fixtures['api/comments']);

        // SUBMISSIONS
        $httpBackend.when('GET', /^api\/submissions\/[\d]+\/submissionFiles/)
            .respond(fixtures['api/files']);

        // ASSIGNMENTS
        mockRoot('api/assignments');
        mockPost('api/assignments');
        mockPatch('api/assignments');
        $httpBackend.when('GET', /^api\/assignments\/[\d]+$/)
            .respond(fixtures['api/assignments'][0]);
        $httpBackend.when('GET', /^api\/assignments\/[\d]+\/requiredFiles$/)
            .respond(fixtures['api/requiredFiles']);
        $httpBackend.when('GET', /^api\/assignments\/[\d]+\/markComponents$/)
            .respond(fixtures['api/markComponents']);
        $httpBackend.when('GET', /^api\/assignments\/[\d]+\/suppliedFiles$/)
            .respond(fixtures['api/files']);

        // Files
        $httpBackend.when('GET', /^api\/files\/[\d]+\/link$/)
            .respond({link: 'link'});

        // TEMPLATES - Just return a blank template.
        $httpBackend.whenGET(/^.*\.tpl\.html$/).respond(
            [200, '<div></div>']
        );

    };
});