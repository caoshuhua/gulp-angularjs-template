/**
 * @author xiufu.wang
 * 
 */
(function () {
  'use strict';

  angular.module('BgoAdmin.admin.futuresContractMag', [])
  	.config(['$stateProvider', routeConfig]);

  function routeConfig($stateProvider) {
    $stateProvider.state('admin.futuresContractMag', {
	      url: '/futuresContractMag',
	      templateUrl: 'app/admin/pages/futuresContractMag/index.html',
	      title: '期货合同管理2'
	    });
    }
})();