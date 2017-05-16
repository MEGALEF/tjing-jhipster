(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipMySuffixController', MembershipMySuffixController);

    MembershipMySuffixController.$inject = ['Membership'];

    function MembershipMySuffixController(Membership) {

        var vm = this;

        vm.memberships = [];

        loadAll();

        function loadAll() {
            Membership.query(function(result) {
                vm.memberships = result;
                vm.searchQuery = null;
            });
        }
    }
})();
