(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('selectCheckBoxExampleComponent', {
		templateUrl: 'app/pages/form/inputs/widgets/ext-select/check/check.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.selects = ['1', '3'];
			$scope.options = {
				datas: [
					{id: '1', text: '上海'},
					{id: '2', text: '北京'},
					{id: '3', text: '深圳'},
					{id: '4', text: '广东'},
				]
			}
			//$scope.emptyoptions = {};
			$scope.selects1 = undefined;
		}]
	})
})(jQuery, angular);