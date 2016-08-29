(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.factory('samplepageCrudService', ['$resource', function($resource){
		return $resource(null, {}, {
			userlist: {method: 'get', url: '/mock/data/userlist', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			save: {method: 'post', url: '/mock/data/usersave', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])

})(jQuery, angular);