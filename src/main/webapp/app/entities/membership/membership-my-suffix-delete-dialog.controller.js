(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipMySuffixDeleteController',MembershipMySuffixDeleteController);

    MembershipMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Membership'];

    function MembershipMySuffixDeleteController($uibModalInstance, entity, Membership) {
        var vm = this;

        vm.membership = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Membership.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
