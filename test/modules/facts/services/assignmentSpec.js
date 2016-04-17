define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('facts.services.assignment', function() {
        var AssignmentService;
        baseTestSetup();
        
        beforeEach(inject(function($injector) {
            AssignmentService = $injector.get('facts.services.assignment');
        }));
        
        it('Load assignment calls out to server and updates internal object', inject(function($httpBackend) {
            AssignmentService.loadAssignment(1);
            $httpBackend.expectGET(/^api\/assignments\/\d+/);
            $httpBackend.flush();
            expect(AssignmentService.currentAssignment.loaded).toBe(true);
            expect(AssignmentService.currentAssignment.assignmentId).toBe(1);
        }));

        it('Get of same assignment after load completes results in cached result', inject(function($httpBackend) {
            AssignmentService.loadAssignment(1);
            $httpBackend.expectGET(/^api\/assignments\/\d+/);
            $httpBackend.flush();
            AssignmentService.getAssignment(1);

        }));

        it('Get of uncached assignment will hit server and not use cache', inject(function($httpBackend) {
            AssignmentService.getAssignment(1);
            $httpBackend.expectGET(/^api\/assignments\/\d+/);
            $httpBackend.flush();
        }));

        it('Get of uncached assignment will not affect cache', inject(function($httpBackend) {
            AssignmentService.getAssignment(1);
            $httpBackend.expectGET(/^api\/assignments\/\d+/);
            $httpBackend.flush();
            expect(AssignmentService.currentAssignment.assignmentId).toBe(-1);
            expect(AssignmentService.currentAssignment.loaded).toBe(false);
        }));

        it('Get of different assignment will hit server and not use cache', inject(function($httpBackend) {
            AssignmentService.loadAssignment(1);
            $httpBackend.expectGET(/^api\/assignments\/1/);
            $httpBackend.flush();
            AssignmentService.getAssignment(2);
            $httpBackend.expectGET(/^api\/assignments\/2/);
            $httpBackend.flush();
        }));
    });
});