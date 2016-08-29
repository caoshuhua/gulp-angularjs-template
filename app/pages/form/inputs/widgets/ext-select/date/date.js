(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.component('selectDateExampleComponent', {
		templateUrl: 'app/pages/form/inputs/widgets/ext-select/date/date.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){
			$scope.selects1 = undefined;
			$scope.selectDateoptions = {};

			$scope.startDate = '2016-07-01';
			$scope.endDate = '2016-07-12';
		}]
	})
})(jQuery, angular);