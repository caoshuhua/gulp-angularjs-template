(function($, angular){
	var module = angular.module('BlurAdmin.pages.libs');
	module.config(['$sceProvider',function($sceProvider) {
		/**
		 *禁用SCE格式化
		 */
		$sceProvider.enabled(false);
	}])
})(jQuery, angular);