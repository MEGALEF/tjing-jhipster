(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('PoolDetailController', PoolDetailController);

    PoolDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pool', 'Membership', 'Share'];

    function PoolDetailController($scope, $rootScope, $stateParams, previousState, entity, Pool, Membership, Share) {
        var vm = this;

        vm.pool = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:poolUpdate', function(event, result) {
            vm.pool = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
