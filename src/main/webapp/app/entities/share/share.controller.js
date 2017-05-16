(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['Share'];

    function ShareController(Share) {

        var vm = this;

        vm.shares = [];

        loadAll();

        function loadAll() {
            Share.query(function(result) {
                vm.shares = result;
                vm.searchQuery = null;
            });
        }
    }
})();
