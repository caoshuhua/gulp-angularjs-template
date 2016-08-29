(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.controller('uiSelectTreeController', ['$scope', '$compile', '$timeout', function($scope, $compile, $timeout){
		var that = this;
		var options = $scope.selectOptions;
		var treeOptions = {options: {}};
		var treeData;
		that.init = function(){
			initOptions();
			initTreeDatas();
			
			$scope.selectionTreeDatas = $scope.$parent.ngModelData;

			$scope.$watch('selectionTreeDatas', function(value){
				$scope.onStateChange({selects: value || []});
			})
		}

		function initOptions(){
			$.extend(treeOptions.options, options);
			treeOptions.options.multiple = !!options.singleSelect ? false : true;
			$scope.treeOptions = treeOptions;
		}

		function initTreeDatas(){
			treeData = $scope.selectPicker.datas || [];
			$scope.treeData = treeData;
		}


	}]).directive('uiSelectTree', ['$compile', '$timeout', function($compile, $timeout){
		return {
			restrict: 'EA',
			templateUrl: 'app/pages/form/inputs/select/template/tree.picker.html',
			controller: 'uiSelectTreeController',
			scope: {
				selectPicker: '=',
				selectOptions: '=',
				onStateChange: '&'
			},
			link: function($scope, element, attrs, ctrl){
				ctrl.init();
			}
		}
	}]);
})(jQuery, angular);