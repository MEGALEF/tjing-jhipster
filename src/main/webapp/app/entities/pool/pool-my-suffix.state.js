(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pool-my-suffix', {
            parent: 'entity',
            url: '/pool-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.pool.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pool/poolsmySuffix.html',
                    controller: 'PoolMySuffixController',
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
        .state('pool-my-suffix-detail', {
            parent: 'pool-my-suffix',
            url: '/pool-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.pool.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pool/pool-my-suffix-detail.html',
                    controller: 'PoolMySuffixDetailController',
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
                        name: $state.current.name || 'pool-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pool-my-suffix-detail.edit', {
            parent: 'pool-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-my-suffix-dialog.html',
                    controller: 'PoolMySuffixDialogController',
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
        .state('pool-my-suffix.new', {
            parent: 'pool-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-my-suffix-dialog.html',
                    controller: 'PoolMySuffixDialogController',
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
                    $state.go('pool-my-suffix', null, { reload: 'pool-my-suffix' });
                }, function() {
                    $state.go('pool-my-suffix');
                });
            }]
        })
        .state('pool-my-suffix.edit', {
            parent: 'pool-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-my-suffix-dialog.html',
                    controller: 'PoolMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pool', function(Pool) {
                            return Pool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pool-my-suffix', null, { reload: 'pool-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pool-my-suffix.delete', {
            parent: 'pool-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pool/pool-my-suffix-delete-dialog.html',
                    controller: 'PoolMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pool', function(Pool) {
                            return Pool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pool-my-suffix', null, { reload: 'pool-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
