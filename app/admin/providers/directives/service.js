(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	module.factory('customDefineService', ['$resource', function($resource){
		return $resource(null, {}, {
			uiGhfAutocomplete: {isArray: true, method: 'get', url: '/mock/data/futuresContractMagService/ghfquery', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			uifhshAutocomplete: {isArray: true, method: 'get', url: '/mock/data/futuresContractMagService/fhshquery', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);