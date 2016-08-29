(function($, angular){
	var module = angular.module('BgoAdmin.admin');
	module.directive('mainPageTitle', ['webConfig', '$q', function(webConfig, $q){
		return {
			restrict: 'EA',
			link: function($scope, element, $attrs){
				//instance.getTitle
				$q.when(webConfig.getTitle()).then(function(result){
					element.text(result || '');
				})
			}
		}
	}])

})(jQuery, angular);