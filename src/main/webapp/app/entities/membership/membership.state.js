(function() {
    'use strict';

    angular
        .module('tjingApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('membership', {
            parent: 'entity',
            url: '/membership',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.membership.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/membership/memberships.html',
                    controller: 'MembershipController',
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
        .state('membership-detail', {
            parent: 'membership',
            url: '/membership/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'tjingApp.membership.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/membership/membership-detail.html',
                    controller: 'MembershipDetailController',
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
                        name: $state.current.name || 'membership',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('membership-detail.edit', {
            parent: 'membership-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-dialog.html',
                    controller: 'MembershipDialogController',
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
        .state('membership.new', {
            parent: 'membership',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-dialog.html',
                    controller: 'MembershipDialogController',
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
                    $state.go('membership', null, { reload: 'membership' });
                }, function() {
                    $state.go('membership');
                });
            }]
        })
        .state('membership.edit', {
            parent: 'membership',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-dialog.html',
                    controller: 'MembershipDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Membership', function(Membership) {
                            return Membership.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('membership', null, { reload: 'membership' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('membership.delete', {
            parent: 'membership',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/membership/membership-delete-dialog.html',
                    controller: 'MembershipDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Membership', function(Membership) {
                            return Membership.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('membership', null, { reload: 'membership' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
