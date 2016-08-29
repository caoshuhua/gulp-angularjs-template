(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.component('samplepageCrudDetailComponent', {
		templateUrl: 'app/pages/samplepage/crud/detail.tpl.html',
		controller: ['$scope', function($scope){
			$scope.lineData = [
		      	{y: "2006", a: 100, b: 90},
		      	{y: "2007", a: 75, b: 65},
		      	{y: "2008", a: 50, b: 40},
		      	{y: "2009", a: 75, b: 65},
		      	{y: "2010", a: 50, b: 40},
		      	{y: "2011", a: 75, b: 65},
		      	{y: "2012", a: 100, b: 90}
			    ];
			}]
	})
})(jQuery, angular);