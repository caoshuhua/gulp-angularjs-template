(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.run(['$httpMock', function($httpMock){
		$httpMock({url: '/mock/data/busy',method: 'get',response: {}, responseTime: 10000});
	}])
})(jQuery, angular);