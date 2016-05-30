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

        it('Should load fully decorated feedback, with submission and assignment already decorated', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/feedback\/1/);
            $httpBackend.flush();
            expect(scope.feedback).toBeDefined();
            expect(scope.feedback.submission).toBeDefined();
            expect(scope.feedback.assignment).toBeDefined();
            expect(scope.feedback.comments).toBeDefined();
        }));
    });
});