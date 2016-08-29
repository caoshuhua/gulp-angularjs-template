(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');

	var directives = [
		{
			name: 'decisionSelectPicker',
			datas:[{id: '1',text: '同意'},{id: '2',text: '不同意'}],
			options: {
				templateTpl: 'app/pages/form/inputs/select/template/checkbox.picker.wapper.html',
			}
		},

		{
			name: 'yeOrNoSelectPicker',
			datas:[{id: '1',text: '是'},{id: '2',text: '否'}],
			options: {
				templateTpl: 'app/pages/form/inputs/select/template/checkbox.picker.wapper.html',
			}
		},

		{
			name: 'dateSelectPicker',
			options: {
				$singleText: true,
				singleSelect: true,
				templateTpl: 'app/pages/form/inputs/select/template/date.picker.wapper.html'
			}
		},
		{
			name: 'checkboxSelectPicker',
			options: {
				templateTpl: 'app/pages/form/inputs/select/template/checkbox.picker.wapper.html'
			}
		},
		{
			name: 'treeSelectPicker',
			options: {
				templateTpl: 'app/pages/form/inputs/select/template/tree.picker.wapper.html'
			}
		}
	]

	angular.forEach(directives, function(item){
		if (!item.name || !item.options){
			return;
		}
		module.directive(item.name, function(){
			return {
				restrict: 'EA',
				priority: 99,
				link: function($scope, element, $attrs){
					var optAttr = $attrs.uiSelectBase;
					if (!optAttr){
		 				return;
		 			}
		 			var newOptions = {options: {}};
		 			var options = $scope[optAttr] && $scope[optAttr].options ? $scope[optAttr].options : {};
		 			if (item.datas){
		 				newOptions.datas = item.datas;
		 			}
		 			$.extend(newOptions.options, options, item.options || {});
		 			$scope[optAttr] = newOptions;
		 		}
			}
		})
	})
})(jQuery, angular);