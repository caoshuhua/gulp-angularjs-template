(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.controller('SamplePageCrudController', ['$scope', 'samplepageCrudService', 'ngDialog', 'ngAlert', Controller]);

	function Controller($scope, samplepageCrudService, ngDialog, ngAlert){
		//定义model
		$scope.userlist = undefined;
		$scope.selectorRows = undefined;
		$scope.searchParams = {};

		//定义操作
		$scope.addUser = function(){
			ngDialog.open({
				templateUrl: 'app/pages/samplepage/crud/add.html',
				controller: 'crudAddController',
				width: 800
			}).closePromise.then(function(data){
				if (data.value){
					$scope.queryUsers();
				}
			})
		}

		$scope.deleteUser = function(){}

		$scope.updateUser = function(){}

		$scope.queryUsers = function(params){
			$scope.userlist = samplepageCrudService.userlist();
		}

		$scope.doCellCommand = function(params){
			ngAlert.info(JSON.stringify(params));
		}

		//ui配置
		$scope.uiTableOptions = {options: {
			columns: [[],[{},{},{},{}, {formatter: emailFormatter}]]
		}};

		function emailFormatter(value, row){
			var html = [
				'<i class="ion-email-unread"></i>',
			    '<a href="javascript:void(0)" class="cell-command"',
			    ' data-record-id="'+ row.id +'"',
			    '>',
				value,
				'</a>'
			];
			return html.join('');
		}
	}

})(jQuery, angular);