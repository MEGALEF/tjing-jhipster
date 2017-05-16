(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ItemMySuffixDialogController', ItemMySuffixDialogController);

    ItemMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Item', 'User', 'Share'];

    function ItemMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Item, User, Share) {
        var vm = this;

        vm.item = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.shares = Share.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.item.id !== null) {
                Item.update(vm.item, onSaveSuccess, onSaveError);
            } else {
                Item.save(vm.item, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('tjingApp:itemUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
