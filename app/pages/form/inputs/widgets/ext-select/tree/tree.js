(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('selectTreeExampleComponent', {
		templateUrl: 'app/pages/form/inputs/widgets/ext-select/tree/tree.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.selects1 = undefined;
			$scope.selects2 = undefined;
			$scope.selectTreeoptions = {
				datas: [
					{id: 'a001', text: '中国', children: [
						{id: '11', text: '上海', children: false},
						{id: '12', text: '深圳', children: false},
						{id: '13', text: '北京', children: false},
						{id: '14', text: '江苏', children: false},
						{id: '15', text: '安徽', children: false}
					]},
					{id: '2', text: '其他', children: [
						{id: '21', text: '日本', children: false},
						{id: '22', text: '韩国', children: false},
						{id: '23', text: '朝鲜', children: false},
						{id: '24', text: '越南', children: false},
						{id: '25', text: '缅甸', children: false}
					]}
				]
			};

		}]
	})
})(jQuery, angular);