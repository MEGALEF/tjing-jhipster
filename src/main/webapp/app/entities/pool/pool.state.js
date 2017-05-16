(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pool', {
            parent: 'entity',
            url: '/pool',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.pool.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pool/pools.html',
                    controller: 'PoolController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pool');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pool-detail', {
            parent: 'pool',
            url: '/pool/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.pool.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pool/pool-detail.html',
                    controller: 'PoolDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pool');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pool', function($stateParams, Pool) {
                    return Pool.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pool',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pool-detail.edit', {
            parent: 'pool-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-dialog.html',
                    controller: 'PoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pool', function(Pool) {
                            return Pool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pool.new', {
            parent: 'pool',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-dialog.html',
                    controller: 'PoolDialogController',
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
                    $state.go('pool', null, { reload: 'pool' });
                }, function() {
                    $state.go('pool');
                });
            }]
        })
        .state('pool.edit', {
            parent: 'pool',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-dialog.html',
                    controller: 'PoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pool', function(Pool) {
                            return Pool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pool', null, { reload: 'pool' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pool.delete', {
            parent: 'pool',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-delete-dialog.html',
                    controller: 'PoolDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pool', function(Pool) {
                            return Pool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pool', null, { reload: 'pool' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
