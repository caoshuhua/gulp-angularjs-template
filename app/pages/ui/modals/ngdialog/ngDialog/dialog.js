(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui.modals');
	module.controller('dialogExampleController', 
		['$scope', 
		 '$location', 
		'$cacheFactory', 
		'$window', 
		'ngDialog',
		$DialogExampleController])
	.component('dialogExampleComponent', {
		templateUrl: 'app/pages/ui/modals/ngdialog/ngDialog/dialog.html',
		controller: 'dialogExampleController'
	})
	.controller('dialogDemoController', ['$scope', 'resolveKey1', 'resolveKey2', dialogDemoController])
	.controller('dialogDirDemoController', ['$scope', dialogDirDemoController]);
	function $DialogExampleController($scope, $location, $cacheFactory, $window, ngDialog){
		$scope.openDialog = function(){
			ngDialog.open({
			templateUrl: 'dialog-templateId.html',
			controller: 'dialogDemoController',
			resolve: {
				resolveKey1: function(){
					return '123';
				},
				resolveKey2: function(){
					return '456';
				}
			}
			}).closePromise.then(function(data){
				alert(data.value);
			})
		}

		$scope.dialogData = {name: 'xiufu.wang', age:  '1234'};
		$scope.ngDialogScope = $scope;
	}

	function dialogDemoController($scope, resolveKey1, resolveKey2){
		$scope.returnValue = 'hello word('+ resolveKey1 +'/ '+ resolveKey2 +')';
	}

	function dialogDirDemoController($scope){
		$scope.returnValue = 'hello word';
	}
})(jQuery, angular);
