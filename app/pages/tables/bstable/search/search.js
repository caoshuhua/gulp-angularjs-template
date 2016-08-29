(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableAvdSearchExampleComponent', {
		templateUrl: 'app/pages/tables/bstable/search/search.html',
		controller: ['$scope', function($scope){
			$scope.tableOptions = {};
			$scope.showSearchParams;
			$scope.jstabledata = {total: 100, rows: [
				{id: '10001',name: '列数据'},
				{id: '10002',name: '列数据'},
				{id: '10003',name: '列数据'},
				{id: '10004',name: '列数据'},
				{id: '10005',name: '列数据'},
				{id: '10006',name: '列数据'}
			]}
			
		}]
	})
})(jQuery, angular);