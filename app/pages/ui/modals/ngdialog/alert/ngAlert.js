(function($, angular){
	var module = angular.module('BlurAdmin.pages.ui.modals');
	module.factory('ngAlert', ['ngDialog', function(ngDialog){
		function openDialog(cls, title, message, okText, type){
			return ngDialog.open({
				showClose: false,
				template: 'app/pages/ui/modals/ngdialog/template/alert.html',
				//appendClassName: cls,
				plain: false,
				controller: function($scope, $element){
					$scope.title = title || '提示信息';
					$scope.message = message || '提示消息';
					$scope.okText = okText || '确认'
					$scope.type = type;
				}
			})
		}

		function info(message, title, okText){
			return openDialog('alert-info', title, message, okText, 1);
		}

		function success(message, title, okText){
			return openDialog('alert-success', title, message, okText, 2);
		}

		function error(message, title, okText){
			return openDialog('alert-danger', title, message, okText, 3);
		}

		return {
			info: info,
			success: success,
			error: error
		}
	}])
})(jQuery, angular);