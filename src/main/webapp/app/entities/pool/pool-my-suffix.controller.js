(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolMySuffixController', PoolMySuffixController);

    PoolMySuffixController.$inject = ['Pool'];

    function PoolMySuffixController(Pool) {

        var vm = this;

        vm.pools = [];

        loadAll();

        function loadAll() {
            Pool.query(function(result) {
                vm.pools = result;
                vm.searchQuery = null;
            });
        }
    }
})();
