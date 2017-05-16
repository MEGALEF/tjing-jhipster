(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareMySuffixDetailController', ShareMySuffixDetailController);

    ShareMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Share', 'Item', 'Pool'];

    function ShareMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Share, Item, Pool) {
        var vm = this;

        vm.share = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:shareUpdate', function(event, result) {
            vm.share = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
