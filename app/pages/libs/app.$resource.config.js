(function($, angular){
	var module = angular.module('BlurAdmin.pages.libs');
	module.config(['$resourceProvider',function($resourceProvider) {
		/**
		 * 忽略url 尾随斜线
		 */
		$resourceProvider.defaults.stripTrailingSlashes = false;
	}])
})(jQuery, angular);