/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', ['BlurAdmin.pages.ui', 'BlurAdmin.pages.libs', 'BlurAdmin.pages.components'])
      .config(['$stateProvider', routeConfig]);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('form', {
          url: '/form',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: '表单元素',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('form.inputs', {
          url: '/inputs',
          templateUrl: 'app/pages/form/inputs/inputs.html',
          title: '输入框',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('form.layouts', {
          url: '/layouts',
          templateUrl: 'app/pages/form/layouts/layouts.html',
          title: '表单布局',
          sidebarMeta: {
            order: 100,
          }
        })
        .state('form.wizard',
        {
          url: '/wizard',
          templateUrl: 'app/pages/form/wizard/wizard.html',
          controller: 'WizardCtrl',
          controllerAs: 'vm',
          title: '表单向导',
          sidebarMeta: {
            order: 200,
          }
        }).state('form.validate',
        {
          url: '/validate',
          templateUrl: 'app/pages/form/validate/index.html',
          controller: 'WizardCtrl',
          controllerAs: 'vm',
          title: '表单验证',
          sidebarMeta: {
            order: 201,
          }
        }).state('form.extselect',
        {
          url: '/extselect',
          templateUrl: 'app/pages/form/inputs/widgets/ext-select/base/index.html',
          title: '扩展选择框',
          sidebarMeta: {
            order: 300,
          }
        }).state('form.extselectcheck',
        {
          url: '/extselectcheck',
          templateUrl: 'app/pages/form/inputs/widgets/ext-select/check/index.html',
          title: '扩展多单选框',
          sidebarMeta: {
            order: 301,
          }
        }).state('form.extselectdate',
        {
          url: '/extselectdate',
          templateUrl: 'app/pages/form/inputs/widgets/ext-select/date/index.html',
          title: '扩展选择日期框',
          sidebarMeta: {
            order: 302,
          }
        }).state('form.extselecttree',
          {
            url: '/extselecttree',
            templateUrl: 'app/pages/form/inputs/widgets/ext-select/tree/index.html',
            title: '扩展选择树框',
            sidebarMeta: {
              order: 303,
            }
        }).state('form.extselectduallist',
          {
            url: '/extselectduallist',
            templateUrl: 'app/pages/form/inputs/widgets/ext-select/duallist/index.html',
            title: '扩展双向选择框',
            sidebarMeta: {
              order: 304,
            }
        }).state('form.autocomplete',
          {
            url: '/autocomplete',
            templateUrl: 'app/pages/form/inputs/autocomplete/index.html',
            title: 'AutoComplete',
            sidebarMeta: {
              order: 304,
            }
        });
  }
})();
