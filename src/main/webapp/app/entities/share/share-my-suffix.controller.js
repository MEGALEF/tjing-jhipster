(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareMySuffixController', ShareMySuffixController);

    ShareMySuffixController.$inject = ['Share'];

    function ShareMySuffixController(Share) {

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
