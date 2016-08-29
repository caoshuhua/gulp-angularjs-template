/**
 * date-picker
 * @author xiufu.wang
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.directive('uiSelectDate', function(){
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				selectPicker: '=',
				selectOptions: '=',
				onStateChange: '&'
			},
			link: function($scope, element, attrs, ctrls){
				/**
				 * 设置parentScope.$singleText = true, 这样会直接将文本插入到表单中
				 * @type {Boolean}
				 */
				$scope.$parent.$parent.$singleText = true;

				var options = {};

				initOptions();
				initDatePicker();

				function initOptions(){
					$.extend(options, $scope.selectOptions || {});
					options.initialDate = $scope.$parent.ngModelData || undefined;
				}

				function initDatePicker(){
					element.datetimepicker(options)
						.on('changeDate', onChange)
						.on('outOfRange', onOutOfRange);
					
					$scope.onStateChange({selects: (angular.isArray(options.initialDate ? options.initialDate[0] : options.initialDate))});
				}

				/**
				 * 选择改变
				 * @param  {[type]} ev [description]
				 * @return {[type]}    [description]
				 */
				function onChange(ev){
					if (ev.date){
						$scope.onStateChange({selects: [element.datetimepicker('getFormattedDate')]});
					} else{
						$scope.onStateChange({selects: undefined});
					}
				}

				/**
				 * 选择超出范围:自动重置表单
				 * @param  {[type]} ev [description]
				 * @return {[type]}    [description]
				 */
				function onOutOfRange(ev, reRender){
					element.datetimepicker('reset');
				}
			}
		}
	});
})(jQuery, angular);