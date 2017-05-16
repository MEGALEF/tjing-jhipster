(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolController', PoolController);

    PoolController.$inject = ['Pool'];

    function PoolController(Pool) {

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
