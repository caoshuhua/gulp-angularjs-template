(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.controller('crudAddController', ['$scope', 'samplepageCrudService', 'ngConfirm', Controller]);

	function Controller($scope, samplepageCrudService, ngConfirm){
		$scope.user = {};
		$scope.savePromise = undefined;
		$scope.save = function(){
			$scope.savePromise = samplepageCrudService.save($.extend(false, {}, $scope.user));
			$scope.savePromise.$promise.then(function(){
				ngConfirm('操作成功, 是否重置并继续添加?', function(res){
					if (!res){
						$scope.closeThisDialog(1);
					} else{
						$scope.user = {};
					}
				})
			});
		}
	}
})(jQuery, angular);