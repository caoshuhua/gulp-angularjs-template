(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	var _$parse;

	function ngUiAutocompleteLink(scope, element, attrs, ctrls){
		var ngModelCtrl = ctrls[0];
		var _$setViewValue = ngModelCtrl.$setViewValue;
		var options;
		var nodeName = element[0].nodeName.toLowerCase();
		var isTextarea = nodeName === "textarea";
		var isInput = nodeName === "input";
		var valueMethod = element[ isTextarea || isInput ? "val" : "text" ];
		
		ngModelCtrl.$setViewValue = function(v){
			if (v && v.value && v.label){
				_$setViewValue.apply(ngModelCtrl, Array.prototype.slice.apply(arguments));
			}

			if(!v || (typeof v === 'string'  && $.trim(v) == '')){
				_$setViewValue.call(ngModelCtrl, undefined);
			}
		}

		 ngModelCtrl.$render = function(){
		 	var item = ngModelCtrl.$modelValue;
		 	if (item && item.value && item.label){
		 		valueMethod.call(element, item.label);
		 	} else {
		 		valueMethod.call(element, '');
		 	}
		}

		var getOptionsWatchFn = function(){
			return _$parse(attrs.ngUiAutocomplete);
		}

		function refresh(){
			//销毁
			if (element.autocomplete('instance')){
				element.autocomplete('destroy');
			}

			options = options || {};
			options.select = function(event, ui){
				ngModelCtrl.$setViewValue(ui.item);
				ngModelCtrl.$render();
				$(this).autocomplete('instance').term = ui.item.label;
				return false;
			}
			//重新创建
			element.autocomplete(options || {});
		}

		if (attrs.ngDisabled) {
            scope.$watch(attrs.ngDisabled, function(v){
            	if (v) {
            		if (element.autocomplete('instance')){
						element.autocomplete('destroy');
					}
            	} else {
            		refresh();
            	}
            });
        }

        scope.$watch(getOptionsWatchFn(), function(config){
        	options = config && config.options ? config.options : {};
        	refresh();
        }, true);

        scope.$on('$destroy', function(){
        	if (element.autocomplete('instance')){
				element.autocomplete('destroy');
			}
        });
	}

	module.directive('ngUiAutocomplete', ['$parse', function($parse){
		_$parse = $parse;
		return {
			restrict: 'EA',
			priority: 1500,
			require: ['ngModel'],
			link: ngUiAutocompleteLink
		}

	}]);
	
	//重写_initSource方法, 增加对 $resource的支持
	var ____initSource = $.ui.autocomplete.prototype._initSource;

	$.ui.autocomplete.prototype._initSource = function(){
		var $resource;
		if (this.options.$resource) {
			$resource = this.options.$resource;
			this.source = function(request, response){
				$resource(request).$promise.then(response);
			}
			return;
		}
		if (!this.source){
			response([]);
			return;
		}
		____initSource.apply(this, Array.prototype.slice.apply(arguments));
	}

})(jQuery, angular);