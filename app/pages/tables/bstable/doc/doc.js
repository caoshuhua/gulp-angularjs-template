(function($, angular){
	var module = angular.module('BlurAdmin.pages.tables');
	module.component('tableDocComponent', {
		templateUrl: 'app/pages/tables/bstable/doc/doc.html',
		controller: ['$scope', 'ngAlert', function($scope, ngAlert){}]
	})
})(jQuery, angular);