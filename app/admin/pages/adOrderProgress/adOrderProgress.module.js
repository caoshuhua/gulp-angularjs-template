/**
 * @author xiufu.wang
 * 
 */
(function () {
  'use strict';

  angular.module('BgoAdmin.admin.adOrderProgress', [])
  	.config(['$stateProvider', routeConfig]);

  function routeConfig($stateProvider) {
    $stateProvider.state('admin.adOrderProgress', {
	      url: '/adOrderProgress',
	      templateUrl: 'app/admin/pages/adOrderProgress/index.html',
	      title: '征订进度查询2'
	    });
    }
})();