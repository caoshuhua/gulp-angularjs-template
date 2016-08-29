/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.modals', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.modals', {
          url: '/modals',
          templateUrl: 'app/pages/ui/modals/modals.html',
          controller: 'ModalsPageCtrl',
          title: '模态框',
          sidebarMeta: {
            order: 300,
          }
        }).state('ui.ngmodals', {
          url: '/ngmodals',
          templateUrl: 'app/pages/ui/modals/ngdialog/ngDialog/index.html',
          title: '扩展模态框',
          sidebarMeta: {
            order: 301,
          }
        })
        .state('ui.ngalert', {
          url: '/ngalert',
          templateUrl: 'app/pages/ui/modals/ngdialog/alert/index.html',
          title: '扩展提示框',
          sidebarMeta: {
            order: 302,
          }
        }).state('ui.ngconfirm', {
          url: '/ngconfirm',
          templateUrl: 'app/pages/ui/modals/ngdialog/confirm/index.html',
          title: '扩展确认框',
          sidebarMeta: {
            order: 303,
          }
          
        });
  }

})();
