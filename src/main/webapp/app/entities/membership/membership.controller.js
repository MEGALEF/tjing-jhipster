(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('MembershipController', MembershipController);

    MembershipController.$inject = ['Membership'];

    function MembershipController(Membership) {

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
