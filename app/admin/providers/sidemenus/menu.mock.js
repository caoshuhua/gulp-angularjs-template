(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	var menusDatas = [
		{
			title: '期货合同管理',
			icon: 'fa fa-table',
			stateRef: 'admin.futuresContractMag'
		},
		{
			title: '征订进度查询2',
			icon: 'fa fa-table',
			stateRef: 'admin.adOrderProgress'
		},
		{
			title: 'user list',
			icon: 'fa fa-table',
			stateRef: 'admin.userList'
		}
	];

	module.config(['$httpMockProvider', function($httpMockProvider){
		$httpMockProvider.mock({url: '/mock/data/sidemenus',method: 'get',response: menusDatas, responseTime: 1});
	}])
})(jQuery, angular);