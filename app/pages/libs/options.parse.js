(function($, angular){
	var module = angular.module('BlurAdmin.pages.libs');
	module.factory('$optionParse', ['$rootScope', function($rootScope){
		return function (attrs, allowedAttrs){
			var options = {};
			var v;
			for (var ar in attrs){
				if (allowedAttrs.hasOwnProperty(ar) && typeof attrs[ar] !== 'undefined'){
					if (typeof allowedAttrs[ar] === 'boolean'){
						options[ar] = $rootScope.$eval(attrs[ar]);
						if (typeof options[ar] !== 'undefined'){
							continue;
						}
					} 
					options[ar] = attrs[ar];
				}
			}
			return options;
		};
	}])
})(jQuery, angular)