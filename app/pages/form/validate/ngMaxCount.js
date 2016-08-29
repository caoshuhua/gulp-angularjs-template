(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.directive('ngMaxCount', [function(){
		return {
		    restrict: 'A',
		    require: '?ngModel',
		    link: function(scope, elm, attr, ctrl) {
		      if (!ctrl) return;

		      var maxCount = 0;
		      attr.$observe('ngMaxCount', function(value) {
		        maxCount = parseInt(value, 10) || 0;
		        ctrl.$validate();
		      });
		      ctrl.$validators.maxCount = function(modelValue, viewValue) {
		      	var v  = (typeof modelValue !== typeof viewValue) ? modelValue : viewValue;
		      	v = v || [];
		      	if (!angular.isArray(v)){
		      		v = [v];
		      	}
		      	return ctrl.$isEmpty(v) || v.length <= maxCount;
		      };
		    }
  		};
	}])
})(jQuery, angular);