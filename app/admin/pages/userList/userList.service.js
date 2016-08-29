(function($, angular){
	var module = angular.module('BgoAdmin.admin.userList');
	module.factory('userListService', ['$resource', function($resource){
		return $resource(null, {}, {
			query: {method: 'get', url: '/mock/data/userListService/list', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);