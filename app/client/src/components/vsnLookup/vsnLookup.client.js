// 'use strict';

// angular.module('truecar')
//   .factory('vsnService', ['$resource', function ($resource) {
//     return $resource('api/v1/vsn/:id', {}, {
//       'query': { method: 'POST', isArray: true},
//       'get': { method: 'GET'},
//       'update': { method: 'PUT'}
//     });
//   }]);

function vsnLookupClient($resource) {
	return $resource('api/v1/vsn', {}, {
		'query': { method: 'POST', isArray: true},
	})
}
module.exports vsnLookupClient;