(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('autoCompleteExampleComponent', {
		templateUrl: 'app/pages/form/inputs/autocomplete/autoComplete.html',
		controller: ['$scope', 'ngAlert', 'InputDsService', function($scope, ngAlert, InputDsService){
			$scope.selects = {value: '9', label: '9 任志飞'};
			$scope.options = {
				options: {
					source: [
						{value: '1', label: '1 刘德华'},
						{value: '2', label: '2 张敬轩'},
						{value: '3', label: '3 张学友'},
						{value: '4', label: '4 蔡依林'},
						{value: '5', label: '5 林心如'},
						{value: '6', label: '6 赵薇'},
						{value: '7', label: '7 萧敬腾'},
						{value: '8', label: '8 马云'},
						{value: '9', label: '9 任志飞'},
						{value: '10', label: '10 李书福'},
						{value: '11', label: '11 马化腾'},
						{value: '12', label: '12 王秀夫'},
						{value: '13', label: '13 马季'},
						{value: '14', label: '14 开心麻花'},
						{value: '15', label: '15 欢乐喜剧人'}
					]
				}
			}

			$scope.selects2 = {"value":"MB-KIDS0011","label":"aaaaaaa-labe-label"};
			$scope.options1 = {
				options: {
					$resource: InputDsService.autocomplete
				}
			}

		}]
	})
	
})(jQuery, angular);