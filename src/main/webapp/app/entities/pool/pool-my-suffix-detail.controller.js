(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolMySuffixDetailController', PoolMySuffixDetailController);

    PoolMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pool', 'Membership', 'Share'];

    function PoolMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Pool, Membership, Share) {
        var vm = this;

        vm.pool = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:poolUpdate', function(event, result) {
            vm.pool = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
