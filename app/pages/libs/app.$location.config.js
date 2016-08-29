(function($, angular){
	var module = angular.module('BlurAdmin.pages.libs');
	module.config(['$locationProvider',function($locationProvider) {
		/**
		 * 注销下面的代码：原因是取消html5Mode模式 可以避免用户因刷新浏览器而带来的复杂逻辑处理
		 */
		//$locationProvider.html5Mode(true);
		/**
		 * 给location hash 添加 "!"作为前缀
		 */
		$locationProvider.hashPrefix('!');
	}])
})(jQuery, angular);