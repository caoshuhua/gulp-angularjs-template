(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
	
	var directives = [
		//供货方信息
		{name: 'uiGhfAutocomplete',options: {$resource: 'uiGhfAutocomplete'}},
		//发货仓库名称
		{name: 'uiFhshAutocomplete',options: {$resource: 'uifhshAutocomplete'}}
	]


	angular.forEach(directives, function(item){
		if (item && item.name && item.options){
			module.directive(item.name, ['customDefineService', '$parse', function(customDefineService, $parse){
				return {
					restrict: 'EA',
					priority: 1400,
					link: function($scope, element, $attrs){
						var configAttr = $attrs.ngUiAutocomplete;
						var newOptions = {};
						if (configAttr){
							var config = $parse(configAttr)($scope) || {};
							config.options = config.options || {};
							angular.copy(config, newOptions);
							newOptions.options.$resource = customDefineService[item.options.$resource];
							$scope[configAttr] = newOptions;
						}
					}
				}
			}])
		}
	});

})(jQuery, angular);