(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('share', {
            parent: 'entity',
            url: '/share',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.share.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/share/shares.html',
                    controller: 'ShareController',
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
        .state('share-detail', {
            parent: 'share',
            url: '/share/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.share.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/share/share-detail.html',
                    controller: 'ShareDetailController',
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
                        name: $state.current.name || 'share',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('share-detail.edit', {
            parent: 'share-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-dialog.html',
                    controller: 'ShareDialogController',
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
        .state('share.new', {
            parent: 'share',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-dialog.html',
                    controller: 'ShareDialogController',
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
                    $state.go('share', null, { reload: 'share' });
                }, function() {
                    $state.go('share');
                });
            }]
        })
        .state('share.edit', {
            parent: 'share',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-dialog.html',
                    controller: 'ShareDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Share', function(Share) {
                            return Share.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('share', null, { reload: 'share' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('share.delete', {
            parent: 'share',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/share/share-delete-dialog.html',
                    controller: 'ShareDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Share', function(Share) {
                            return Share.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('share', null, { reload: 'share' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
