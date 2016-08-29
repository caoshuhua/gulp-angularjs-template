/**
 * @author xiufu.wang
 * 
 */
(function () {
  'use strict';

  angular.module('BgoAdmin.admin.userList', [])
  	.config(['$stateProvider', routeConfig]);

  function routeConfig($stateProvider) {
    $stateProvider.state('admin.userList', {
	      url: '/userList',
	      templateUrl: 'app/admin/pages/userList/index.html',
	      title: '征订进度查询2'
	    });
    }
})();