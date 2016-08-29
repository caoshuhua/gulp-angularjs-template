(function($, angular){
	var module = angular.module('BgoAdmin.admin.futuresContractMag');
	module.factory('futuresContractMagService', ['$resource', function($resource){
		return $resource(null, {}, {
			query: {method: 'get', url: '/mock/data/futuresContractMagService/list', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);