define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.courseOwner.course.assignment.controllers.details', function() {
        var AssignmentDetailsController, scope, PieChartService;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            PieChartService = $injector.get('base.services.piechart');
            spyOn(PieChartService, 'getPieChartLines').andCallFake(function() {return []});
            AssignmentDetailsController = $controller('facts.courseOwner.course.assignment.controllers.details', {
                $scope: scope,
                $stateParams: {assignmentId: 1}
            });
        }));

        it('Should load an assignment, required files, supplied files and mark components', inject(function($httpBackend) {
            $httpBackend.expectGET(/^api\/assignments\/1/);
            $httpBackend.expectGET(/^api\/assignments\/1\/requiredFiles/);
            $httpBackend.expectGET(/^api\/assignments\/1\/markComponents/);
            // $httpBackend.expectGET('api/assignments/1/suppliedFiles');
            $httpBackend.flush();
            expect(scope.assignment).toBeDefined();
            expect(scope.suppliedFiles).toBeDefined();
            expect(scope.markComponents).toBeDefined();
            expect(scope.requiredFiles).toBeDefined();
        }));

        it('Should make call to server to get download link with associated fileId', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.download(5);
            $httpBackend.expectGET(/^api\/files\/5\/link/);
            $httpBackend.flush();
        }));
    });
});