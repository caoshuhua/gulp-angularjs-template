(function($, angular){
	var module = angular.module('BgoAdmin.admin.userList');
	module.component('userListComponent', {
		templateUrl: 'app/admin/pages/userList/component.html',
		controller: 'userListController'
	})

})(jQuery, angular);