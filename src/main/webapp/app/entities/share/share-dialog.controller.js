(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareDialogController', ShareDialogController);

    ShareDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Share', 'Item', 'Pool'];

    function ShareDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Share, Item, Pool) {
        var vm = this;

        vm.share = entity;
        vm.clear = clear;
        vm.save = save;
        vm.items = Item.query();
        vm.pools = Pool.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.share.id !== null) {
                Share.update(vm.share, onSaveSuccess, onSaveError);
            } else {
                Share.save(vm.share, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('tjingApp:shareUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
