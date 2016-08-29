(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
	
	var directives = [
		//品牌选择数据
		{//品牌
			name: 'brandsBsselectPickerDatas',
			datas: [
				{id: '1',label: 'AMPM'}, 
				{id: '2',label: '博物馆'},
				{id: '3',label: '总部'},
				{id: '4',label: 'ME&CITY KIDS'},
				{id: '5',label: 'METERSBONWE'},
				{id: '6',label: 'ME&CITY'},
				{id: '7',label: 'MooMoo'},
				{id: '8',label: '琪格'},
				{id: '9',label: '第三方品牌'}
			]
		},
		{//合同生成状态
			name: 'futuresContractStatesPickerDatas',
			datas: [
				{id: '2',label: '未生成'}, 
				{id: '1',label: '已生成'}
			]
		},
		{//合同撤销状态
			name: 'futuresContractRevocationStatesPickerDatas',
			datas: [
				{id: '-1',label: '否'}, 
				{id: '1',label: '是'}
			]

		},
		{//商品属性
			name: 'goodAttributesPickerDatas',
			datas: [
				{id: '1',label: '商品属性1'}, 
				{id: '2',label: '商品属性2'},
				{id: '3',label: '商品属性3'},
				{id: '4',label: '商品属性4'},
				{id: '5',label: '商品属性5'}
			]

		},{ //上市批次
			name: 'launchBatchPickerDatas',
			datas: [
				{id: '1',label: '1'}, 
				{id: '2',label: '2'},
				{id: '3',label: '3'},
				{id: '4',label: '4'},
				{id: '5',label: '5'},
				{id: '6',label: '6'},
				{id: '7',label: '7'},
				{id: '8',label: '8'},
				{id: '9',label: '9'}
			]

		},{//变更状态
			name: 'contractChangeStatesPickerDatas',
			datas: [
				{id: '1',label: '变更中'}, 
				{id: '2',label: '未变更'},
				{id: '3',label: '已变更'}
			]
		},{ //转让状态
			name: 'contractTransferStatesPickerDatas',
			datas: [
				{id: '1',label: '转让中'}, 
				{id: '2',label: '未转让'},
				{id: '3',label: '已转让'}
			]
		},{ //currency
			name: 'currencyPickerDatas',
			datas: [
				{id: '1',label: '人民币'}, 
				{id: '2',label: '美元'},
				{id: '3',label: '港元'}
			]
		}
	]

	angular.forEach(directives, function(item){
		if (!item.datas || !item.name){
			return;
		}
		module.directive(item.name, ['$parse', function($parse){
			return {
				restrict: 'EA',
				priority: 1400,
				link: function($scope, element, $attrs){
					var optionsExp = $attrs.ngOptions;
					if (!optionsExp){
						return;
					}
					var match = optionsExp.match(NG_OPTIONS_REGEXP);
              		if (!match[8]){
              			return;
              		}
              		$scope[match[8]] = item.datas;

              		//更新ngModal
              		
              		var ngModel = $attrs.ngModel;
              		if (!ngModel){
              			return;
              		}
              		var selectValues = $parse(ngModel)($scope) || [];
              		if (!angular.isArray(selectValues)){
              			selectValues = [selectValues];
              		}

              		var _d = item.datas;
              		var selectObjects = [];
              		angular.forEach(selectValues, function(v){
              			if (!v){
              				return;
              			}
              			for (var i = 0; i < _d.length; i++) {
              				if ((v.id && _d[i].id == v.id) || v == _d[i].id){
              					selectObjects.push(_d[i]);
              				}
              			}
					})

					if ('multiple' in $attrs){
						$scope[ngModel] = selectObjects.length > 0 ? selectObjects : undefined;
					} else {
						$scope[ngModel] = selectObjects.length > 0 ? selectObjects[0] : undefined;
					}
				}
			}
		}])
	})

	
})(jQuery, angular);