(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ItemMySuffixController', ItemMySuffixController);

    ItemMySuffixController.$inject = ['Item'];

    function ItemMySuffixController(Item) {

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
