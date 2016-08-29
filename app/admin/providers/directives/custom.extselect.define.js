(function($, angular){
	var module = angular.module('BgoAdmin.admin');

	// var directives = [
	// 	{
	// 		name: 'futuresContractRevocationStatesSelectPicker',
	// 		datas:[{id: '3',text: '全部'},{id: '2',text: '否'}, {id: '1',text: '是'}],
	// 		options: {
	// 			templateTpl: 'app/pages/form/inputs/select/template/tree.picker.wapper.html'
	// 		}
	// 	},
	// 	{
	// 		name: 'futuresContractStatesSelectPicker',
	// 		datas:[{id: '3',text: '全部'},{id: '2',text: '未生成'}, {id: '1',text: '已生成'}],
	// 		options: {
	// 			templateTpl: 'app/pages/form/inputs/select/template/tree.picker.wapper.html'
	// 		}
	// 	},
	// 	{
	// 		name: 'brandsSelectPicker',
	// 		datas:[{id: '3',text: '全部'},
	// 			{id: '1',text: 'AMPM'}, 
	// 			{id: '2',text: '博物馆'},
	// 			{id: '3',text: '总部'},
	// 			{id: '4',text: 'ME&CITY KIDS'},
	// 			{id: '5',text: 'METERSBONWE'},
	// 			{id: '6',text: 'ME&CITY'},
	// 			{id: '7',text: 'MooMoo'},
	// 			{id: '8',text: '琪格'},
	// 			{id: '9',text: '第三方品牌'}],
	// 		options: {
	// 			templateTpl: 'app/pages/form/inputs/select/template/tree.picker.wapper.html'
	// 		}
	// 	}
	// ]

	// angular.forEach(directives, function(item){
	// 	if (!item.name || !item.options){
	// 		return;
	// 	}
	// 	module.directive(item.name, function(){
	// 		return {
	// 			restrict: 'EA',
	// 			priority: 99,
	// 			link: function($scope, element, $attrs){
	// 				var optAttr = $attrs.uiSelectBase;
	// 				if (!optAttr){
	// 	 				return;
	// 	 			}
	// 	 			var newOptions = {options: {}};
	// 	 			var options = $scope[optAttr] && $scope[optAttr].options ? $scope[optAttr].options : {};
	// 	 			if (item.datas){
	// 	 				newOptions.datas = item.datas;
	// 	 			}
	// 	 			$.extend(newOptions.options, options, item.options || {});
	// 	 			$scope[optAttr] = newOptions;
	// 	 		}
	// 		}
	// 	})
	// })
})(jQuery, angular);