(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolMySuffixDialogController', PoolMySuffixDialogController);

    PoolMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pool', 'Membership', 'Share'];

    function PoolMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pool, Membership, Share) {
        var vm = this;

        vm.pool = entity;
        vm.clear = clear;
        vm.save = save;
        vm.memberships = Membership.query();
        vm.shares = Share.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pool.id !== null) {
                Pool.update(vm.pool, onSaveSuccess, onSaveError);
            } else {
                Pool.save(vm.pool, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('tjingApp:poolUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
