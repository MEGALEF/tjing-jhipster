(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ItemMySuffixDeleteController',ItemMySuffixDeleteController);

    ItemMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Item'];

    function ItemMySuffixDeleteController($uibModalInstance, entity, Item) {
        var vm = this;

        vm.item = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Item.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
