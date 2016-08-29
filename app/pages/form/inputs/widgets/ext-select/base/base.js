(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('selectBaseExampleComponent', {
		templateUrl: 'app/pages/form/inputs/widgets/ext-select/base/base.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.selects = ['1'];
			$scope.uiSelectoptions = {};

			$scope.chanageSelectData = function(){
				$scope.selects = ['1', '2'];
			}

			$scope.chanageDataSource = function(){
				$scope.selects = ['2'];
			}
		}]
	})
	
})(jQuery, angular);