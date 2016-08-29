(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('formValidateExampleComponent', {
		templateUrl: 'app/pages/form/validate/validate.html',
		controller: ['$scope', 'ngAlert', 'InputDsService', function($scope, ngAlert, inputDsService){
			
			$scope.standardSelectItems = inputDsService.select();
			
			$scope.$data = {}
			
			$scope.doSave = function(){

				ngAlert.info('提交成功');
			}

			//扩展
			$scope.selects1 = undefined;
			$scope.selects2 = undefined;
			$scope.selects3 = undefined;
			$scope.selects4 = undefined;
			$scope.selects5 = undefined;
			$scope.selects6 = undefined;
			$scope.selects7 = undefined;
			$scope.selects8 = undefined;

			$scope.extSelectoptions1 = {}
			$scope.selectTreeoptions1 = {
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

			var now = new Date();
			var day   = now.getDate();  
			var s = $.format.date(now.setDate( day-50 ), 'yyyy-MM-dd');
			var e = $.format.date(now.setDate( day + 100 ), 'yyyy-MM-dd');
			$scope.selectDateoptions1 = {
				options: {
					startDate: s,
					endDate: e
				}
			};
			$scope.selectDateoptions2 = {};



			$scope.selectDuallistOptions1 = {
				options:{
					singleSelect: false,
					idField: 'id',
					textField: 'column1',
					template: 'app/pages/form/inputs/select/dualpicker/base/table.html',
					controller: 'baseDuallistTableConTroller',
					textNgResource: inputDsService.texts
				}
			};

			$scope.selectDuallistOptions2 = {
				options:{
					idField: 'id',
					textField: 'column1',
					template: 'app/pages/form/inputs/select/dualpicker/base/table.html',
					controller: 'baseDuallistTableConTroller',
					textNgResource: inputDsService.texts
				}
			};
		}]
	})
})(jQuery, angular);