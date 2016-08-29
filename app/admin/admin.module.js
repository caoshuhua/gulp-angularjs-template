(function () {
  'use strict';

  angular.module('BgoAdmin.admin', [
  	'BlurAdmin.pages',
  	'ngResource',
  	'BgoAdmin.admin.home',
    'BgoAdmin.admin.adOrderProgress',
    'BgoAdmin.admin.futuresContractMag',
    'BgoAdmin.admin.userList',
  	]).config(['$urlRouterProvider', 
      'baSidebarServiceProvider', 
      '$stateProvider', routeConfig])
      .config(['webConfigProvider', webConfig]);
	 

  function routeConfig($urlRouterProvider, baSidebarServiceProvider, $stateProvider) {
  	$urlRouterProvider.otherwise('/home');

    $stateProvider.state('admin', {
        url: '/admin',
        template : '<ui-view></ui-view>',
        abstract: true
    })
  }

  //web配置
  function webConfig(webConfigProvider){
    //设置框架信息
    webConfigProvider.setSystem('BgoAdmin前端框架(1.0.3)', '', 'Copyright © 2016　上海美特斯邦威服饰股份有限公司　版权所有');
    
    webConfigProvider.setInit({
      //获取菜单信息
      sidebarenus: ['MyMenuService', function(MyMenuService){
          return MyMenuService.getMyMenus();
      }]
    });

    //配置http 拦截
    // webConfigProvider.addHttpException({
    //   fn: ['httpResponse', function(httpResponse){
    //      // console.log('------------HttpException interceptors---');
    //   }],
    //   self: undefined,
    //   resolve: {}
    // });
  }

})();
