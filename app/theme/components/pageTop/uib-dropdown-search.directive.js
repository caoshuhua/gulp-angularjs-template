(function ($, angular) {
	angular.module('BlurAdmin.theme.components')
      .directive('uibDropdownSearch', ['$timeout', uibDropdownSearch]);

    function uibDropdownSearch($timeout){
    	return {
			require: '?^uibDropdown',
			link: function(scope, element, attrs, dropdownCtrl) {
				if (!dropdownCtrl) {
			       return;
			    }
			    dropdownCtrl.toggleElement = element;

			    var toggleDropdown = function(event) {
			       	$timeout.cancel(toggleDropdown.timer);
			        toggleDropdown.timer = $timeout(function(){
			        	if (!element.hasClass('disabled') && !attrs.disabled) {
				          scope.$apply(function() {
				            dropdownCtrl.toggle();
				          });
				        }
			        }, 100, true);
				};
				element.bind('focus', toggleDropdown);

				scope.$on('$destroy', function() {
			       element.unbind('focus', toggleDropdown);
			    });
			}
    	}
    }

})(jQuery, angular);