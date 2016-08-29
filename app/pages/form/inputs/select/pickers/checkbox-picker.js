/**
 * checkbox-picker
 * @author xiufu.wang
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.controller('uiSelectChecboxContrller', 
		['$scope', 
		'$timeout',
		'$element',
		function($scope, $timeout, $element){
			$timeout(function(){
				$scope.$selectItem = $element.find('.checkbox-select-item')
					.off('click.ui-select')
					.on('click.ui-select', updateSelector);

				//watch ngModel
				var values = $scope.$parent.ngModelData;
				var options =  $scope.selectOptions;
				var initValues = values || [];
				initValues = angular.isArray(initValues) ? initValues : [initValues];
				if (options.singleSelect && initValues.length > 1){
					initValues = [initValues[0]];
				}
				angular.forEach(initValues, function(v){
					var v = options.onlyIdValue ? v : v.id;
					$scope.$selectItem.filter('[value="'+ v +'"]').prop('checked', true);
				})

			}, 0, true);

			function updateSelector(event){
				var that = this;
				var $that = $(this);
				$timeout.cancel($element.timer);
				$element.timer = $timeout(function(){
					var selects = [];
					var options =  $scope.selectOptions;
					var checked = $that.prop('checked');
					if (options.singleSelect){
						$scope.$selectItem.filter(':checked').not(that).prop('checked', false);
						if (checked){
							selects = [{id: $that.val(), text: $that.attr('text')}]
						}
					} else {
						$scope.$selectItem.filter(':checked').each(function(){
							selects.push({id: $(this).val(), text: $(this).attr('text')});
						})
					}
					triggerChange(selects);
				}, 100, false);
			}

			function triggerChange(selects){
				$scope.onStateChange({selects: selects});
			}
	}])
	//创建ui-select-checbox指令
	.directive('uiSelectChecbox', function(){
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/pages/form/inputs/select/template/checkbox.picker.html',
			scope: {
				selectPicker: '=',
				selectOptions: '=',
				onStateChange: '&'
			},
			controller: 'uiSelectChecboxContrller',
			link: function($scope, element, attrs, ctrls){
				var options = $scope.selectOptions;
				//格式化数据
				angular.forEach($scope.selectPicker.datas || [], function(v){
					v['__id__'] = v[options.idField];
					v['__text__'] = v[options.textField];
				})
			}
		}
	});
})(jQuery, angular);