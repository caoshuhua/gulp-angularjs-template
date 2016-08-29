(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.component('samplepageCrudComponent', {
		templateUrl: 'app/pages/samplepage/crud/list.html',
		controller: 'SamplePageCrudController'
	})
})(jQuery, angular);