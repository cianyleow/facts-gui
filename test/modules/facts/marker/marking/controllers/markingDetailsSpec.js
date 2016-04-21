define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.marker.marking.details', function() {
        var MarkingDetailsController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            MarkingDetailsController = $controller('facts.marker.marking.controllers.details', {
                $scope: scope,
                $stateParams: {feedbackId: 1}
            });
        }));

        it('Should load feedback, full submission, comments and marks from API', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/feedback\/1/);
            $httpBackend.expectGET(/^api\/feedback\/1\/submission/);
            $httpBackend.expectGET(/^api\/feedback\/1\/comments/);
            $httpBackend.expectGET(/^api\/feedback\/1\/marks/);
            $httpBackend.expectGET(/^api\/submissions\/1\/submissionFiles/);
            $httpBackend.flush();
            expect(scope.feedback).toBeDefined();
            expect(scope.submission).toBeDefined();
            expect(scope.marks).toBeDefined();
            expect(scope.comments).toBeDefined();
            expect(scope.submissionFiles).toBeDefined();
        }));
    });
});