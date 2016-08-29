/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.samplepage', ['BlurAdmin.pages.ui', 'BlurAdmin.pages.form' ,'BlurAdmin.pages.libs', 'BlurAdmin.pages.components'])
      .config(['$stateProvider', routeConfig]);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('samplepage', {
          url: '/samplepage',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '表单元素'
        })
        .state('samplepage.crud', {
          url: '/crud',
          templateUrl: 'app/pages/samplepage/crud/index.html',
          title: '用户信息管理'
        })
    }
})();
