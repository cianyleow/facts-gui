define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.assignment.controllers.assignments', function() {
        var AssignmentsController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            AssignmentsController = $controller('facts.courseOwner.course.assignment.controllers.assignments', {
                $scope: scope,
                $stateParams: {courseId: 1}
            });
        }));

        it('Should load a list of assignments for the $stateParams course.', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/courses\/1/);
            $httpBackend.flush();
            expect(scope.assignments).toBeDefined();
        }));
    });
});