(function($, angular){
	var module = angular.module('BlurAdmin.pages.components');
	var defaultConfig = {
		containParentNode: false,
		multiple: false,
		parentTagField: 'isParent'
	};

	module.directive('uiTreeControl', ['$optionParse', '$timeout', function($optionParse, $timeout){
		return {
			restrict: 'EA',
			scope: {
				jstreeData: '=ngModel', //绑定数据源
				selectionNodes: '=selectionNodes', //绑定已选择节点
				uiTreeControl: '=uiTreeControl',//绑定配置
				onSelection: '&', //绑定选择事件处理函数
				onRedraw: '&',
				ngResource: '=ngResource'
			},
			require: ['ngModel', 'uiTreeControl'],
			controller: 'uiTreeControler',
			link: function($scope, $element, $attrs, ctrls){
				var ngModelCtrl = ctrls[0];
				var ctrl = ctrls[1];
				var initTimer;

				$scope.$watch('uiTreeControl.options', function(options){
					doInit(getOptions(options));
				}, true);

				ngModelCtrl.$render = function(){
					var options = getOptions(options);
					doInit(getOptions(options));
				}

				 //tree-reference
	            if ($attrs.treeReference){
	              $scope.$parent[$attrs.treeReference] = $element;
	            }

				function doInit(options, slient){
					if (options && !options.data){
						if ($scope.jstreeData && $scope.jstreeData.$promise){
							if (!slient){
								jstreeData.$promise.then(function(data){
									options.data = data;
									doInit(options, true);
								});
								return;
							}
						} else {
							options.data = $scope.jstreeData;
						}
					}
					if ($scope.ngResource){
						options.ngResource = $scope.ngResource;
					}
					$timeout.cancel(initTimer);
					initTimer = $timeout(function(){
						ctrl.init(options);
					}, 50, true);
				}

				function getOptions(options){
	                if (!options){
	                  options = $scope.uiTreeControl.options || {};
	                }
	                config = $.extend(true, {}, defaultConfig, $optionParse($attrs, $.extend({}, $.jstree.defaults.core, defaultConfig)), options);
	                return config;
            	}

            }
		}
	}]).controller('uiTreeControler', 
		['$scope',
		'$element',
		'$attrs',
		'$timeout',
		function($scope, $element, $attrs, $timeout){
			var that = this;

			that.init = function(options){
				that.options = options;
				that.destroy();
				that.bind();
				that.initTree();

			}

			that.bind = function(){
				var options = that.options || {};
				$element.off('select_node.jstree deselect_node.jstree')
				.on('select_node.jstree', onSelect)
				.on('redraw.jstree', onRedraw)
				.on('deselect_node.jstree', onDeSelect)
				.on('load_node.jstree', onAfterLoadChildren)

			}

			that.destroy = function(){
				if (that.jstree){
					$element.jstree('destroy', false);
				}
				that.jstree = undefined;
			}

			that.initTree = function(){
				var options = that.options;
				var treeOption = {core: options, types: {"default": {"icon": "fa fa-folder"}}};
				if (options.multiple == true){
					treeOption.plugins = ['types', 'checkbox'];
					treeOption.checkbox = options;
				} else {
					treeOption.plugins = ['types'];
				}

				$element.jstree(treeOption);
				that.jstree = $element;
			}

			$scope.$watch('selectionNodes', function(selectNodes){
				var options = that.options;
				 if (that.jstree){
				 	if (options.multiple){
				 		$element.jstree('uncheck_all', true);
						$element.jstree('check_node', selectNodes || [], null ,true);
						angular.forEach(selectNodes || [], function(v){
							$element.jstree('_open_to', v);
						})
					} else {
				 		$element.jstree('select_node', selectNodes || [], true);
				 	}
				}
			});

			function onAfterLoadChildren(){
				$timeout.cancel(onAfterLoadChildren.timer);
				onAfterLoadChildren.timer = $timeout(function(){
					var options = that.options;
					if (that.jstree){
						if (options.multiple){
					 		$element.jstree('uncheck_all', true);
							$element.jstree('check_node', $scope.selectionNodes || [], null, true);
					 		angular.forEach($scope.selectionNodes || [], function(v){
								$element.jstree('_open_to', v);
							})
					 	} else {
					 		$element.jstree('select_node', $scope.selectionNodes || [], true);
					 	}
					}
				}, 50, true);
			}

			/**
			 * 详见jstree源码 _append_json_data 方法中的1752行
			 * 
			 */
			function onRedraw(nodes){
				$timeout.cancel(onRedraw.timer);
				onRedraw.timer = $timeout(function(){
					$scope.onRedraw(nodes);
				}, 100, true);
			}

			function onSelect(event, obj){
				var options = that.options;
				$timeout.cancel(onSelect.timer);
				onSelect.timer = $timeout(function(){
					updateSelect(obj.node, true);
				}, 50, true);
				var node = obj.node;
				if ((!options.containParentNode) && ((node.children && node.children.length > 0) || node.original[options.parentTagField])){
					return;
				}
				$scope.onSelection({node: obj.node});
			}

			function onDeSelect(event, obj){
				$timeout.cancel(onDeSelect.timer);
				onDeSelect.timer = $timeout(function(){
					updateSelect(obj.node, false);
				}, 50, true)
			}

			function updateSelect(node, isSelect){
				var options = that.options;
				var selectors;
				if (!options.multiple && isSelect){
					if ((!options.containParentNode) && ((node.children && node.children.length > 0) || node.original[options.parentTagField])){
						$scope.selectionNodes = undefined;
						return;
					}
					selectors = [node];
				} else {
					selectors = $element.jstree((options.containParentNode ? 'get_selected' : 'get_bottom_selected'), true);
				}

				selectors = $.map(selectors || [], function(v){
					if ((!options.containParentNode) && ((v.children && v.children.length > 0) || v.original[options.parentTagField])){
						return null;
					}
					return {
						id: v.id,
						text: v.text
					}
				})
				$scope.selectionNodes = selectors;
			}
	}])
})(jQuery, angular);