(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	var defaultConfig = {
		//是否单选
		singleSelect: false,
		idFiled: 'id',
		textField: 'name',
		//触发元素
		triggerSelector: ':self',
		pickerHeight: undefined,
		pickerWidth: undefined,
		template: undefined,
		controller: undefined,
		//配置加载文本内容的接口
		textNgResource: undefined,
		showDisplayText: function(options, values, datas, fn){
			var texts = [];
			values = values || [];
			values = angular.isArray(values) ? values : [values];
			if (!values || values.length === 0){
				fn('');
				return;
			}

			if (!datas && options.textNgResource){
				options.textNgResource({ids: values})
					.$promise.then(function(datas){
						options.showDisplayText(options, values, datas, fn);
					}, function(){
						options.showDisplayText(options, values, [], fn);
					});
				return;
			}

			datas = datas || [];
			angular.forEach(values, function(v){
				for (var i = 0; i < datas.length; i++) {
					if (datas[i].id == v){
						texts.push(datas[i].text);
					}
				}
			})

			fn(texts.join(','));
		}
	}

	module.directive('uiSelectDuallist', function(){
		return {
			restrict: 'EA',
			priority: 100,
			scope: {
				uiSelectDuallist: '=',
				ngModelData: '=ngModel'
			},
			require: ['ngModel', 'uiSelectDuallist'],
			controller: 'uiSelectDuallistController',
			link: function($scope, $element, $attrs, ctrls){
				var ngModelCtrl = ctrls[0];
				var ctrl = ctrls[1];
				ctrl.init(ngModelCtrl);
			}
		}
	}).controller('uiSelectDuallistController', 
		['$scope', 
		'$element', 
		'$attrs', 
		'$optionParse',
		'ngDialog',
		function($scope, $element, $attrs, $optionParse, ngDialog){

			var that = this;
			var ngModelCtrl; 

			that.init = function(_ngModelCtrl){
				ngModelCtrl = _ngModelCtrl;
				initOptions();
				initTrigger();

				ngModelCtrl.$render = function(){
					var options = $scope.options;
					options.showDisplayText(options, ngModelCtrl.$modelValue, ngModelCtrl.__dataInfo__, function(texts){
						$element.val(texts);
					})
				}
			}

			function initOptions(){
				$scope.options = getOptions();
			}

			function initTrigger(){
				var options = $scope.options;
				var triggerSelector = $.trim(options.triggerSelector);
				var $el = $element;
				var triggerTarget;
				if (triggerSelector.indexOf(':parent:') !== -1 && triggerSelector.length > 9){
					var r = $el.parent().find(triggerSelector.substring(8)).eq(0);
					if (r.length > 0){
						triggerTarget = r;
					}
				} else if (triggerSelector == ':self'){

					triggerTarget = $el;

				} else if(triggerSelector != ''){
					var r = $(body).find(triggerSelector).eq(0);
					if (r.length > 0){
						triggerTarget = r;
					}
				}
				
				$scope.triggerTarget = triggerTarget || $el;

				$scope.triggerTarget.off('click.ui-select-base', triggerClick).on('click.ui-select-base', triggerClick)
				if ($scope.triggerTarget != $el){
					$el.off('click.ui-select-base', triggerClick).on('click.ui-select-base', triggerClick);
				}
			}

			function getOptions(){
				var options = ($scope.uiSelectDuallist || {}).options || {};
				return $.extend(true, {}, defaultConfig, $optionParse($element.data(), defaultConfig), options);
			}

			function triggerClick(){
				var options = $scope.options;
				var dialogOptions = {
					height: options.pickerHeight,
					width: options.pickerWidth,
					resolve: {
						//表单配置
						selectOptions: function(){
							return getOptions();
						},
						//表单已选数据
						selectionNodes: function(){
							return $scope.ngModelData;
						}
					}
				}
				dialogOptions.template = options.template;
				dialogOptions.controller = options.controller;

				ngDialog.open(dialogOptions)
					.closePromise
					.then(function(data){
						if (data.value !== 'cancel'){ //取消
							var values = data.value || [];
							$scope.$evalAsync(function(){
								$scope.ngModelData = formatSelectItems(values);
							})
						}
				});
			}


			function formatSelectItems(values){
				var options = $scope.options;
				values = values || [];
				ngModelCtrl.__dataInfo__ = values;
				var res = [];
				angular.forEach(values, function(v){
					res.push(v[options.idFiled]);
				})
				if (options.singleSelect){
					return res.length > 0 ? res[0] : undefined;
				} else {
					return res.length > 0 ? res : undefined;
				}
			}
	}])
})(jQuery, angular);