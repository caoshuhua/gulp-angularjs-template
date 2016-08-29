(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.controller('uiSelectDecisionController', ['$scope', '$element', '$attrs' , function($scope, $element, $attrs){
		 var optAttr = $attrs.uiSelectBase;
		 if (!optAttr){
		 	return;
		 }
		 $element.data('templateTpl', 'app/pages/form/inputs/select/template/checkbox.picker.wapper.html');
		 var options = $scope[optAttr] || ($scope[optAttr]={options: {}});
		 options.datas = [{id: '1',text: '同意'},{id: '2',text: '不同意'},{id: '3',text: '不认同'},{id: '4',text: '不接受'}];//mockService.list();
	}]).directive('uiSelectDecision', function(){
		return {
			restrict: 'EA',
			priority: 99,
			controller: 'uiSelectDecisionController',
			link: function($scope, element, attrs, ctrls){
				// var dataListProperty = attrs.uiSelectDataList;
				// element.data('templateTpl', 'checkbox-picker-wapper');
				// if (!dataListProperty){
				// 	return;
				// }
				// var datas = [{id: '1',text: '同意'},{id: '2',text: '不同意'}];
				// $scope.selectDatas = datas;
			}
		}
	});
	
})(jQuery, angular);