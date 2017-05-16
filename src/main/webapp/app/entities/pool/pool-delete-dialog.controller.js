(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolDeleteController',PoolDeleteController);

    PoolDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pool'];

    function PoolDeleteController($uibModalInstance, entity, Pool) {
        var vm = this;

        vm.pool = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pool.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
