(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	//默认配置
	var defaultConfig = {
		appendToBody: false,
		/**
		 * 1.:self 当前指令所在Element 
		 * 2.:parent:.*: 从父节点中查找*指定的元素
		 * 3. .*body中的某个元素
		 * @type {String}
		 */
		triggerSelector: ':self',
		//设置树选择时，是否包含父节点
		containParentNode: false,
		pickerWidth: undefined,
		pickerHeight: undefined,
		//仅返回Id
		onlyIdValue: true,
		idField: 'id',
		textField: 'text',
		singleSelect: false,
		templateTpl: undefined,
		/**
		 * 根据modelVaue获取showDisplayText文本内容
		 * @param  {[type]}   $scope   [description]
		 * @param  {[type]}   dataList [description]
		 * @param  {[type]}   values   [description]
		 * @param  {Function} fn       [description]
		 * @return {[type]}            [description]
		 */
		showDisplayText: function($scope, dataList, values, fn, slient){
			var options = $scope.options;
			var idField = options.idField;
			var textField = options.textField;
			var singleSelect = options.singleSelect;
			var onlyIdValue = options.onlyIdValue;
			var texts = [];

			if ($scope.$singleText === true || $scope.options.$singleText === true){
				if (typeof values === 'string'){
					fn(values);
				}
				values = values || [];
				fn(angular.isArray(values) ? values.join(',') : values);
				return;
			}

			function findData(key, datas){
				for(var i=0; i<datas.length; i++){
					if (datas[i].id == key){
						return datas[i];
					}
					if (datas[i].children && datas[i].children.length > 0){
						var v = findData(key, datas[i].children);
						if (v){
							return v;
						}
					}
				}
				return undefined;
			}
			
			if(!dataList || !values || (angular.isArray(values) && values.length == 0)){
				fn('');
				return;
			}
			if (dataList.$promise && !slient){
				dataList.$promise.then(function(data){
					options.showDisplayText($scope, data, values, fn, true);
				})
			} else {
				values = values || [];
				dataList = dataList || [];

				if (singleSelect){
					if (angular.isArray(values)){
						values = values.length > 0 ? [values[0]] : values;
					} else {
						values = [values];
					}
				}

				for (var i = 0; i < values.length; i++) {
					var v2 = onlyIdValue ? values[i] : values[i].id;
					var v1 = findData(v2, dataList);
					if (v1){
						texts.push(v1[textField]);
					}
				}
				
				fn(texts.join(','))
			}
		},
		//date-picker配置
		format: 'yyyy-mm-dd', //yyyy-mm-dd日期
		language: 'zh-CN',
		fontAwesome: true,
		initialDate: undefined, //初始化日期
		todayBtn: true,
		clearBtn: true,
		startDate: undefined,
		endDate: undefined,
		minuteStep: 3,
		maxView: 4,
		minView: 3
	}

	//controller
	function $controller($scope,
		$templateCache,
		$element,
		$attrs,
		$compile,
		$parse,
		$window,
		$document,
		$rootScope,
		$position,
		$timeout,
		$optionParse 
		){
		var that = this;
		var ngModelCtrl;
		var emptyTemplateTpl = '<span>无显示内容</span>';
		var scrollParentEl;

		//初始化
		that.init = function(_ngModelCtrl){
			ngModelCtrl = _ngModelCtrl;
			initOptions();
			initPopup();
			initTrigger();
			initWatcher();			

			$scope.$on('$destroy', function(){
				if ($scope.$popup){
					$scope.$popup.remove();
				}
			})
		}

		/**
		 * 初始化参数
		 * @return {[type]} [description]
		 */
		function initOptions(){
			$scope.options = $.extend(true, {}, defaultConfig, $optionParse($element.data(), defaultConfig), formatUiSelectBaseOptions());
			if ($scope.startDate){
				$scope.options.startDate = $scope.startDate;
			}
			if ($scope.endDate){
				$scope.options.endDate = $scope.endDate;
			}
			$scope.isOpen = false;
		}

		function formatUiSelectBaseOptions(){
			var uiOpts = $scope.uiSelectBase || {};
			return uiOpts.options || {};
		}

		/**
		 * 初始化Popup
		 * @return {[type]} [description]
		 */
		function initPopup(){
			if ($scope.$popup){
				$scope.$popup.remove();
				$scope.$popup = that.$popup = undefined;
			}
			var options = $scope.options;
			var popupTemplate = $templateCache.get('app/pages/form/inputs/select/template/popup.html')
			var element = angular.element(popupTemplate);
			var templateTpl = options.templateTpl;
			var plain = options.plain;
			var template;
			var $popup;
			if (plain){
				template = templateTpl;
			} else {
				template = $templateCache.get(templateTpl);
			}
			template = template || emptyTemplateTpl;
			element.find('.popup-content').append(template);
			
			if (options.formatTemplate && typeof options.formatTemplate === 'function'){
				element = options.formatTemplate(element, options);
			}
			var $popup = $compile(element)($scope);
			$scope.$popup = that.$popup = $popup;
			element.remove();
			element = undefined;

			var appendElement = $element.closest( ".ui-front, ngdialog, dialog" );
			if (appendElement && appendElement.length > 0){
				appendElement.append($popup);
			} else {
				if (options.appendToBody) {
			    	$document.find('body').append($popup);
				} else {
				   $element.after($popup);
				}
			}
		}

		/**
		 * 初始化Trigger
		 * @return {[type]} [description]
		 */
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

		function triggerClick(event){
			event.preventDefault();
			var isOpen = true; 
			if ($scope.disabled){
				if ($scope.isOpen === false){
					return;
				}
				isOpen = false;
			}
			$scope.isOpen = isOpen;
			$scope.$evalAsync(function(){
				$scope.isOpen = isOpen;
			})
		}

		function initWatcher(){
			//负责维护displayText
			$scope.$watch('ngModelData', function(){
				var values = ngModelCtrl.$viewValue;
				if(typeof ngModelCtrl.$viewValue != typeof ngModelCtrl.$modelValue){
					values = ngModelCtrl.$modelValue;
				}
				var opts = $scope.uiSelectBase || {};
				$scope.options.showDisplayText($scope, opts.datas, values, function(_text){
					$element.val(_text);
				});
			})

			//负责picker的显示与隐藏
			$scope.$watch('isOpen', function(value){
				if (value){
					if(!$scope.disabled){
						$timeout(function(){
							positionPopup();
							$document.on('click', documentClickBind);
							if (!scrollParentEl){
								scrollParentEl = angular.element($position.scrollParent($element));
								scrollParentEl.on('scroll', positionPopup);
							}
							angular.element($window).on('resize', positionPopup);
						}, 0, true);
						return;
					} else {
						$scope.isOpen = false;
					}
				}
				$document.off('click', documentClickBind);
				angular.element($window).off('resize', positionPopup);
				if(scrollParentEl){
					scrollParentEl.off('resize', positionPopup);
				}
			})

			//负责监控表单的状态
			$scope.$parent.$watch($parse($attrs.ngDisabled), function(disabled) {
  				$scope.disabled = disabled;
			})

			$scope.$watch('startDate', function(v){
				initOptions();
				var mv = $scope.ngModelData;
				if (v && mv && v > mv){
					ngModelCtrl.$setViewValue(undefined);
				}
			}, true);

			$scope.$watch('endDate', function(v){
				initOptions();
				var mv = $scope.ngModelData;
				if (v && mv && v < mv){
					ngModelCtrl.$setViewValue(undefined);
				}
			}, true);
		}

		function positionPopup() {
			var $popup = $scope.$popup;
			var options = $scope.options;
			if ($scope.isOpen && $popup) {
		      var dpElement = angular.element($popup[0].querySelector('.ui-dropdown-select-wapper'));
		      var position = $position.positionElements($element, dpElement, 'auto bottom-left', options.appendToBody);
		      dpElement.css({top: position.top + 'px', 
		      	left: position.left + 'px' 
		      });
		      dpElement.find('.popup-content').css({
		      	width: (options.pickerWidth || ($element.width() + 30)) + 'px',
		      	height: (options.pickerHeight || 100) + 'px',
		      })
		      if (dpElement.hasClass('uib-position-measure')) {
			  	dpElement.removeClass('uib-position-measure');
			  }
		    }
		}

		function documentClickBind(event) {
			var $popup = $scope.$popup;
		    if (!$scope.isOpen && $scope.disabled || !$popup) {
		      return;
		    }
			var popup = $popup[0];
		    var dpContainsTarget = $element[0].contains(event.target);
		    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
		    if (!(dpContainsTarget || popupContainsTarget)){
		    	var parentNode = $(event.target).parents().eq(0);
		    	if (parentNode.is('.jstree-node')){
		    		popupContainsTarget = true;
		    	}
		    }

			if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget || $(event.target).closest('.popup-content').length > 0)) {
		      $scope.$apply(function() {
		        $scope.isOpen = false;
		      });
		    }
		}

		$scope.onStateChange = function(selector){
			var options = $scope.options;
			var res = [];
			selector = selector || [];
			angular.forEach(angular.isArray(selector) ? selector : [selector], function(v){
				if (options.onlyIdValue && v && typeof v === 'object' && v.hasOwnProperty('id')){
					res.push(v.id);
				} else {
					res.push(v);
				}
			})
			res = res.length > 0 ? res : undefined;
			if (res && options.singleSelect){
				res = res[0];
			}
			if (!$scope.$root.$$phase){
				$scope.$apply(function(){
					ngModelCtrl.$setViewValue(res);
				});
			} else{
				ngModelCtrl.$setViewValue(res);
			}
		}

		$scope.$watch('uiSelectBase.options', function(v){
			initOptions();
			initPopup();
		}, true);
	}

	function $link(scope, element, attrs, ctrls){
		var ngModelCtrl = ctrls[0];
		var ctrl = ctrls[1];
		ctrl.init(ngModelCtrl);
	}

	module.controller('uiSelectBaseController', 
		['$scope',
		'$templateCache',
		'$element', 
		'$attrs', 
		'$compile', 
		'$parse', 
		'$window', 
		'$document', 
		'$rootScope', 
		'$uibPosition',
		'$timeout', 
		'$optionParse',
		$controller])
	.directive('uiSelectBase', function(){
		return {
			link: $link,
			restrict: 'EA',
			priority: 100,
			scope: {
				uiSelectBase: '=',
				ngModelData: '=ngModel',
				startDate: '=startDate',
				endDate: '=endDate'
			},
			require: ['ngModel', 'uiSelectBase'],
			controller: 'uiSelectBaseController'
		}
	});

})(jQuery, angular);