define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.assignment.controllers.details', function() {
        var AssignmentDetailsController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            AssignmentDetailsController = $controller('facts.courseOwner.course.assignment.controllers.details', {
                $scope: scope,
                $stateParams: {assignmentId: 1}
            });
        }));

        it('Should load a fully decorated assignment and a list of submission separately.', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/assignments\/1/);
            $httpBackend.expectGET(/^api\/assignments\/1\/submissions/);
            $httpBackend.flush();
            expect(scope.assignment).toBeDefined();
            expect(scope.assignment.suppliedFiles).toBeDefined();
            expect(scope.assignment.requiredFiles).toBeDefined();
            expect(scope.submissions).toBeDefined();
        }));
    });
});