'use strict';

describe('Controller Tests', function() {

    describe('Share Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockShare, MockItem, MockPool;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockShare = jasmine.createSpy('MockShare');
            MockItem = jasmine.createSpy('MockItem');
            MockPool = jasmine.createSpy('MockPool');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Share': MockShare,
                'Item': MockItem,
                'Pool': MockPool
            };
            createController = function() {
                $injector.get('$controller')("ShareMySuffixDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'tjingApp:shareUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
