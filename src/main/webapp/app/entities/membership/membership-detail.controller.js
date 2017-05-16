(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipDetailController', MembershipDetailController);

    MembershipDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Membership', 'User', 'Pool'];

    function MembershipDetailController($scope, $rootScope, $stateParams, previousState, entity, Membership, User, Pool) {
        var vm = this;

        vm.membership = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:membershipUpdate', function(event, result) {
            vm.membership = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
