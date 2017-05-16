(function() {
    'use strict';
    angular
        .module('tjingApp')
        .factory('Pool', Pool);

    Pool.$inject = ['$resource'];

    function Pool ($resource) {
        var resourceUrl =  'api/pools/:id';

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
