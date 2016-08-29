(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui.modals');
	module.controller('alertExampleController', 
		['$scope', 
		'$location', 
		'$cacheFactory', 
		'$window', 
		'ngAlert', 
		$AlertExampleController])
	.component('alertExampleComponent', {
		templateUrl: 'app/pages/ui/modals/ngdialog/alert/alert.html',
		controller: 'alertExampleController'
	})
	
	function $AlertExampleController($scope, $location, $cacheFactory, $window, ngAlert){
		$scope.openAlertSuccess = function(){
			ngAlert.success('success message', 'success title', 'success ok');
		}

		$scope.openAlertInfo = function(){
			ngAlert.info('info message', 'info title', 'info ok');
		}

		$scope.openAlertError = function(){
			ngAlert.error('error message', 'error title', 'error ok');
		}
	}

})(jQuery, angular);
