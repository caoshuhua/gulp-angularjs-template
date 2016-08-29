(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.factory('InputDsService', ['$resource', function($resource){
		return $resource(null, {}, {
			tableDatas: {method: 'get', url: '/mock/data/table', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			texts: {isArray: true, method: 'get', url: '/mock/data/table/text', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			tree: {isArray: true, method: 'get', url: '/mock/data/tree', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			select: {isArray: true, method: 'get', url: '/mock/data/select', headers: {'X-Requested-With': 'XMLHttpRequest'}},
			autocomplete: {isArray: true, method: 'get', url: '/mock/data/autocompele', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		})
	}])
})(jQuery, angular);