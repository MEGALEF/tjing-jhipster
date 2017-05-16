(function() {
    'use strict';

    angular
        .module('tjingApp')
        .controller('ItemMySuffixDetailController', ItemMySuffixDetailController);

    ItemMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Item', 'User', 'Share'];

    function ItemMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Item, User, Share) {
        var vm = this;

        vm.item = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('tjingApp:itemUpdate', function(event, result) {
            vm.item = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
