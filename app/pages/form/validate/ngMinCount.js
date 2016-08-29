(function($, angular){
	var module = angular.module('BlurAdmin.pages.form');
	module.directive('ngMinCount', [function(){
		return {
		    restrict: 'A',
		    require: '?ngModel',
		    link: function(scope, elm, attr, ctrl) {
		      if (!ctrl) return;

		      var minCount = 0;
		      attr.$observe('ngMinCount', function(value) {
		        minCount = parseInt(value, 10) || 0;
		        ctrl.$validate();
		      });
		      ctrl.$validators.minCount = function(modelValue, viewValue) {
		      	var v  = (typeof modelValue !== typeof viewValue) ? modelValue : viewValue;
		      	v = v || [];
		      	if (!angular.isArray(v)){
		      		v = [v];
		      	}
		      	return ctrl.$isEmpty(v) || v.length >= minCount;
		      };
		    }
  		};
	}])
})(jQuery, angular);