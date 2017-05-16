(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareMySuffixDeleteController',ShareMySuffixDeleteController);

    ShareMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Share'];

    function ShareMySuffixDeleteController($uibModalInstance, entity, Share) {
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
