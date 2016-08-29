(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	
	module.provider('bgoConfig', [function(){

		//config propertys
		var loginOutUrl; //退出连接
		var systemTitle; //系统标题
		var systemLogo;//系统logo地址
		var footerInstruction;//footer描述


		this.$get = function(){

			return {};
		}
	}]);

})(jQuery, angular);