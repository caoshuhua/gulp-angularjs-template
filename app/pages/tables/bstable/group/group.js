(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableGroupExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/group/group.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.tableOptions = {};
			$scope.jstabledata = {total: 100, rows: [
				{id: '10001',name: '列数据', gb1: '分组1', sf: 1},
				{id: '10002',name: '列数据', gb1: '分组1', sf: 2},
				{id: '10003',name: '列数据', gb1: '分组1', sf: 3},
				{id: '10004',name: '列数据', gb1: '分组2', sf: 4},
				{id: '10005',name: '列数据', gb1: '分组2', sf: 5},
				{id: '10006',name: '列数据', gb1: '分组2', sf: 6},
				{id: '10007',name: '列数据', gb1: '分组3', sf: 7},
				{id: '10008',name: '列数据', gb1: '分组3', sf: 8},
				{id: '10009',name: '列数据', gb1: '分组3', sf: 9},
				{id: '100010',name: '列数据', gb1: '分组4', sf: 10},
				{id: '100011',name: '列数据', gb1: '分组4', sf: 11},
				{id: '100012',name: '列数据', gb1: '分组4', sf: 12},
				{id: '100013',name: '列数据', gb1: '分组4', sf: 13},
			]}
		}]
	})
})(jQuery, angular);