(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipMySuffixDetailController', MembershipMySuffixDetailController);

    MembershipMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Membership', 'User', 'Pool'];

    function MembershipMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Membership, User, Pool) {
        var vm = this;

        vm.membership = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:membershipUpdate', function(event, result) {
            vm.membership = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
