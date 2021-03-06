(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipMySuffixDialogController', MembershipMySuffixDialogController);

    MembershipMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Membership', 'User', 'Pool'];

    function MembershipMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Membership, User, Pool) {
        var vm = this;

        vm.membership = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.pools = Pool.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.membership.id !== null) {
                Membership.update(vm.membership, onSaveSuccess, onSaveError);
            } else {
                Membership.save(vm.membership, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('tjingApp:membershipUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
