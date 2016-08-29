(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableTreeViewExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/treeview/treeview.html',
		controller: ['$scope', '$compile', 'ngAlert', function($scope, $compile, ngAlert){
			$scope.tableOptions = {};
			$scope.jstabledata = {total: 100, rows: [
				{id: '100000001',name: '列数据', pid: undefined},
					{id: '1000000011',name: '列数据', pid: 100000001},
						{id: '10000000111',name: '列数据', pid: 1000000011},
							{id: '100000001111',name: '列数据', pid: 10000000111},
							{id: '100000001112',name: '列数据', pid: 10000000111},
							{id: '100000001113',name: '列数据', pid: 10000000111},
							{id: '100000001114',name: '列数据', pid: 10000000111},
						{id: '10000000112',name: '列数据', pid: 1000000011},
						{id: '10000000113',name: '列数据', pid: 1000000011},
						{id: '10000000114',name: '列数据', pid: 1000000011},
						{id: '10000000115',name: '列数据', pid: 1000000011},
						{id: '10000000116',name: '列数据', pid: 1000000011},
					{id: '1000000012',name: '列数据', pid: 100000001},
					{id: '1000000013',name: '列数据', pid: 100000001},
					{id: '1000000014',name: '列数据', pid: 100000001},
					{id: '1000000015',name: '列数据', pid: 100000001},
					{id: '1000000016',name: '列数据', pid: 100000001},
					{id: '1000000017',name: '列数据', pid: 100000001},
					{id: '1000000018',name: '列数据', pid: 100000001},
					{id: '1000000019',name: '列数据', pid: 100000001},
				{id: '100000002',name: '列数据', pid: undefined},
				{id: '100000002',name: '列数据', pid: undefined},
			]}
		}]
	})
})(jQuery, angular);