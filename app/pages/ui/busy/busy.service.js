(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui');
	module.factory('mockBusyService', ['$resource', function($resource){
		return $resource(null, {}, {
			busy: {method: 'get', url: '/mock/data/busy', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);