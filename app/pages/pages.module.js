/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.config',
    'BlurAdmin.pages.libs',
    'BlurAdmin.pages.samplepage'
  ]).config(['$urlRouterProvider', 'baSidebarServiceProvider', '$bgoConfigProvider', routeConfig]);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider, $bgoConfigProvider) {
    if ($bgoConfigProvider.Config.options.showHelpMenus === true){
        baSidebarServiceProvider.addStaticItem({
          title: '常用页面',
          icon: 'ion-document',
          subMenu: [{
            title: '登陆页面',
            fixedHref: 'auth.html',
            blank: true
          }, {
            title: '注册页面',
            fixedHref: 'reg.html',
            blank: true
          }, {
            title: '用户表单',
            stateRef: 'profile'
          }, {
            title: '404错误',
            fixedHref: '404.html',
            blank: true
          },{
            title: '500错误',
            fixedHref: '500.html',
            blank: true
          },{
            title: 'CRUD参考模板',
            stateRef: 'samplepage.crud'
          }]
        });
        baSidebarServiceProvider.addStaticItem({
          title: '多级菜单',
          icon: 'ion-ios-more',
          subMenu: [{
            title: '第二级1',
            disabled: true
          }, {
            title: '第二级2',
            subMenu: [{
              title: '第三级1',
              disabled: true
            }]
          }]
        });
      } 
    }
})();
