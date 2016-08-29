(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('selectDualListExampleComponent', {
		templateUrl: 'app/pages/form/inputs/widgets/ext-select/duallist/duallist.html',
		controller: ['$scope', 'ngAlert', 'InputDsService', function($scope, ngAlert, InputDsService){
			$scope.selects1 = [];
			$scope.selectDuallistOptions = {
				options:{
					singleSelect: false,
					idField: 'id',
					textField: 'column1',
					chosenType: 'table',
					template: 'app/pages/form/inputs/select/dualpicker/base/table.html',
					controller: 'baseDuallistTableConTroller',
					textNgResource: InputDsService.texts
				}
			};

			$scope.selects2 = undefined;

			$scope.selectDuallistOptions2 = {
				options:{
					singleSelect: false,
					containParentNode: true,
					idField: 'id',
					textField: 'text',
					template: 'app/pages/form/inputs/select/dualpicker/base/tree.html',
					controller: 'baseDuallistTreeConTroller',
					textNgResource: InputDsService.texts
				}

			};
		}]
	})
})(jQuery, angular);