(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('share-my-suffix', {
            parent: 'entity',
            url: '/share-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.share.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/share/sharesmySuffix.html',
                    controller: 'ShareMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('share');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('share-my-suffix-detail', {
            parent: 'share-my-suffix',
            url: '/share-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.share.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/share/share-my-suffix-detail.html',
                    controller: 'ShareMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('share');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Share', function($stateParams, Share) {
                    return Share.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'share-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('share-my-suffix-detail.edit', {
            parent: 'share-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-my-suffix-dialog.html',
                    controller: 'ShareMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Share', function(Share) {
                            return Share.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('share-my-suffix.new', {
            parent: 'share-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-my-suffix-dialog.html',
                    controller: 'ShareMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('share-my-suffix', null, { reload: 'share-my-suffix' });
                }, function() {
                    $state.go('share-my-suffix');
                });
            }]
        })
        .state('share-my-suffix.edit', {
            parent: 'share-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-my-suffix-dialog.html',
                    controller: 'ShareMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Share', function(Share) {
                            return Share.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('share-my-suffix', null, { reload: 'share-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('share-my-suffix.delete', {
            parent: 'share-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-my-suffix-delete-dialog.html',
                    controller: 'ShareMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Share', function(Share) {
                            return Share.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('share-my-suffix', null, { reload: 'share-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
