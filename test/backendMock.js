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

        // ASSIGNMENTS
        mockRoot('api/assignments');
        mockPost('api/assignments');
        mockPatch('api/assignments');
        $httpBackend.when('GET', /^api\/assignments\/[\d]+$/)
            .respond(fixtures['api/assignments'].assignments[0]);

        // TEMPLATES - Just return a blank template.
        $httpBackend.whenGET(/^.*\.tpl\.html$/).respond(
            [200, '<div></div>']
        );

    };
});