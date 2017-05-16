(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareDeleteController',ShareDeleteController);

    ShareDeleteController.$inject = ['$uibModalInstance', 'entity', 'Share'];

    function ShareDeleteController($uibModalInstance, entity, Share) {
        var vm = this;

        vm.share = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Share.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
