//定义系统菜单接口服务
(function(){
	angular.module('BgoAdmin.admin')
	.factory('MyMenuService', ['$resource', function($resource){
		return $resource(null, {}, {
			getMyMenus: {isArray: true, method: 'get', url: '/mock/data/sidemenus', headers: {'X-Requested-With': 'XMLHttpRequest'}}
		});
	}]);
})();