(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('membership-my-suffix', {
            parent: 'entity',
            url: '/membership-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.membership.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/membership/membershipsmySuffix.html',
                    controller: 'MembershipMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('membership');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('membership-my-suffix-detail', {
            parent: 'membership-my-suffix',
            url: '/membership-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.membership.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/membership/membership-my-suffix-detail.html',
                    controller: 'MembershipMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('membership');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Membership', function($stateParams, Membership) {
                    return Membership.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'membership-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('membership-my-suffix-detail.edit', {
            parent: 'membership-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-my-suffix-dialog.html',
                    controller: 'MembershipMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Membership', function(Membership) {
                            return Membership.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('membership-my-suffix.new', {
            parent: 'membership-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-my-suffix-dialog.html',
                    controller: 'MembershipMySuffixDialogController',
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
                    $state.go('membership-my-suffix', null, { reload: 'membership-my-suffix' });
                }, function() {
                    $state.go('membership-my-suffix');
                });
            }]
        })
        .state('membership-my-suffix.edit', {
            parent: 'membership-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-my-suffix-dialog.html',
                    controller: 'MembershipMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Membership', function(Membership) {
                            return Membership.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('membership-my-suffix', null, { reload: 'membership-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('membership-my-suffix.delete', {
            parent: 'membership-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-my-suffix-delete-dialog.html',
                    controller: 'MembershipMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Membership', function(Membership) {
                            return Membership.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('membership-my-suffix', null, { reload: 'membership-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
