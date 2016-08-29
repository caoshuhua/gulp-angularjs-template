(function($, angular){
	var module = angular.module('BgoAdmin.admin.adOrderProgress');
	module.controller('adOrderProgressController', 
		['$scope',
		'adOrderProgressService',
		'ngAlert',
		'ngDialog',
		function($scope, service, ngAlert, ngDialog){
			//定义model
			$scope.tableDatas = undefined;
			$scope.tableOptions = {
				options: {
					columns: [
						{},
						{},
						{},
						{},
						{},
						{},
						{},
						{},
					]
				}
			};

			//定义搜索界面model
			$scope.queryParams = {};
			$scope.uiStartDateoptions = {};
			$scope.uiEndDateoptions = {};

			//定义Methods
			$scope.queryDatas = function(params){
				console.log('-------queryParams: ' + JSON.stringify(params || {}));
				$scope.tableDatas = service.query();
			}

			$scope.aaaa = function(){

				console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
			}

			
	}])

})(jQuery, angular);