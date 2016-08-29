(function($, angular){
	var module = angular.module('BlurAdmin.pages.samplepage');
	module.component('uiBusyComponent', {
		templateUrl: 'app/pages/ui/busy/busy.html',
		controller: ['$scope', 'mockBusyService', function($scope, mockBusyService){
			$scope.busyPromise;

			$scope.busy = function(){
				$scope.busyPromise = mockBusyService.busy().$promise;
			}
		}]
	})
})(jQuery, angular);