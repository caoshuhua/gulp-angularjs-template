(function($, angular){
	var module = angular.module('BgoAdmin.admin.adOrderProgress');
	module.factory('adOrderProgressService', ['$resource', function($resource){
		return $resource(null, {}, {
			query: {method: 'get', url: '/mock/data/adOrderProgressService/list', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);