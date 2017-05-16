(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['Item'];

    function ItemController(Item) {

        var vm = this;

        vm.items = [];

        loadAll();

        function loadAll() {
            Item.query(function(result) {
                vm.items = result;
                vm.searchQuery = null;
            });
        }
    }
})();
