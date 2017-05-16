(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('item-my-suffix', {
            parent: 'entity',
            url: '/item-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.item.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/item/itemsmySuffix.html',
                    controller: 'ItemMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('item');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('item-my-suffix-detail', {
            parent: 'item-my-suffix',
            url: '/item-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.item.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/item/item-my-suffix-detail.html',
                    controller: 'ItemMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('item');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Item', function($stateParams, Item) {
                    return Item.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'item-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('item-my-suffix-detail.edit', {
            parent: 'item-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-my-suffix-dialog.html',
                    controller: 'ItemMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Item', function(Item) {
                            return Item.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('item-my-suffix.new', {
            parent: 'item-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-my-suffix-dialog.html',
                    controller: 'ItemMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('item-my-suffix', null, { reload: 'item-my-suffix' });
                }, function() {
                    $state.go('item-my-suffix');
                });
            }]
        })
        .state('item-my-suffix.edit', {
            parent: 'item-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-my-suffix-dialog.html',
                    controller: 'ItemMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Item', function(Item) {
                            return Item.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('item-my-suffix', null, { reload: 'item-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('item-my-suffix.delete', {
            parent: 'item-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-my-suffix-delete-dialog.html',
                    controller: 'ItemMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Item', function(Item) {
                            return Item.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('item-my-suffix', null, { reload: 'item-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
