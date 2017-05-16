(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ShareDetailController', ShareDetailController);

    ShareDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Share', 'Item', 'Pool'];

    function ShareDetailController($scope, $rootScope, $stateParams, previousState, entity, Share, Item, Pool) {
        var vm = this;

        vm.share = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:shareUpdate', function(event, result) {
            vm.share = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
