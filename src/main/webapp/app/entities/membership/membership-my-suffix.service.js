(function() {
    'use strict';
    angular
        .module('tjingApp')
        .factory('Membership', Membership);

    Membership.$inject = ['$resource'];

    function Membership ($resource) {
        var resourceUrl =  'api/memberships/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
