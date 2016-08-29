/**
 * @author xiufu.wang
 * 
 */
(function () {
  'use strict';

  angular.module('BgoAdmin.admin.home', [])
  	.config(['$urlRouterProvider', 
  		'$stateProvider',
  		'$locationProvider',
  		routeConfig]);

  function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
  	
    //配置路由
    $urlRouterProvider.otherwise('/home');
  	$locationProvider.hashPrefix('!');

    //添加路由配置
  	$stateProvider.state('home', {
	      url: '/home',
	      templateUrl: 'app/admin/home/index.html',
	      title: '首页',
	      system: true,
	      sidebarMeta: {
	        icon: 'ion-android-home',
	        order: 0,
	      },
	    });
    }
})();
