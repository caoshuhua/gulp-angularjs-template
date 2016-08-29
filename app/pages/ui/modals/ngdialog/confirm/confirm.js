(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui.modals');
	module.controller('confirmExampleController', 
		['$scope', 
		'$location', 
		'$cacheFactory', 
		'$window', 
		'ngConfirm', 
		$ConfirmExampleController])
	.component('confirmExampleComponent', {
		templateUrl: 'app/pages/ui/modals/ngdialog/confirm/confirm.html',
		controller: 'confirmExampleController'
	})
	
	function $ConfirmExampleController($scope, $location, $cacheFactory, $window, ngConfirm){
		$scope.openConfirm1 = function(){
			ngConfirm('确认要操作吗?', function(res){
				alert(res);
             })
		}

		$scope.openConfirm2 = function(){
			ngConfirm('确认要操作吗?').then(function(res){
				alert(res.value);
            })
		}
	}

})(jQuery, angular);
