(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableBaseExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/base/base.html',
		controller: ['$scope', '$compile', function($scope, $compile){
			$scope.tableOptions = {};
			$scope.tableSelectedData = [];
			$scope.tableSelectedData1 = [];
			$scope.jstabledata = {total: 100, rows: [
				{id: '100000001',name: '用户1',role: '测试角色1'},
				{id: '100000002',name: '用户2',role: '测试角色2'},
				{id: '100000003',name: '用户3',role: '测试角色3'},
				{id: '100000004',name: '用户4',role: '测试角色4'},
				{id: '100000005',name: '用户5',role: '测试角色5'},
				{id: '100000006',name: '用户6',role: '测试角色6'},
				{id: '100000007',name: '用户7',role: '测试角色7'},
				{id: '100000008',name: '用户8',role: '测试角色8'}
			]}
			$scope.jstabledata1 = {total: 100, rows: [
				{id: '100000001',name: '用户1',role: '测试角色1'},
				{id: '100000002',name: '用户2',role: '测试角色2'},
				{id: '100000003',name: '用户3',role: '测试角色3'},
				{id: '100000004',name: '用户4',role: '测试角色4'},
				{id: '100000005',name: '用户5',role: '测试角色5'},
				{id: '100000006',name: '用户6',role: '测试角色6'},
				{id: '100000007',name: '用户7',role: '测试角色7'},
				{id: '100000008',name: '用户8',role: '测试角色8'}
			]}

			$scope.refreshData = function(){
				var newDatas = [];
				angular.forEach($scope.jstabledata.rows, function(v){
					v.name = '用户' + new Date().getTime();
					newDatas.push(v);
				})

				$scope.jstabledata1 = {
					total: 1000,
					rows: newDatas
				}
			}
		}]
	})

})(jQuery, angular);