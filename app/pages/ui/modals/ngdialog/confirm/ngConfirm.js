(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui.modals');
	module.factory('ngConfirm', ['ngDialog', function(ngDialog){
		return function openDialog(message, fn, title, okText, cancelText){
			var ngDg, callbackFn;
			ngDg = ngDialog.open({
				showClose: false,
				template: 'app/pages/ui/modals/ngdialog/template/confirm.html',
				//appendClassName: cls,
				plain: false,
				controller: function($scope, $element){
					$scope.title = title || '确认信息';
					$scope.message = message || '提示消息';
					$scope.okText = okText || '是'
					$scope.cancelText = cancelText || '否'
				}
			});

			if(typeof fn === 'function'){
				ngDg.closePromise.then(function(data){
					fn(data.value);
				})
			}
			return ngDg.closePromise;
		}
	}])
})(jQuery, angular);