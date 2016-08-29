/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', ['BlurAdmin.pages.libs', 'BlurAdmin.pages.ui'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tables', {
          url: '/tables',
          template : '<ui-view></ui-view>',
          abstract: true,
          controller: 'TablesPageCtrl',
          title: '表格',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        }).state('tables.basic', {
          url: '/basic',
          templateUrl: 'app/pages/tables/basic/tables.html',
          title: '基础表格',
          sidebarMeta: {
            order: 1,
          },
        }).state('tables.smart', {
          url: '/smart',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: '高级表格',
          sidebarMeta: {
            order: 2,
          },
        }).state('tables.bstable', {
          url: '/bstable',
          templateUrl: 'app/pages/tables/bstable/base/index.html',
          title: 'BS表格',
          sidebarMeta: {
            order: 3,
          },
        }).state('tables.bstabledoc', {
          url: '/bstabledoc',
          templateUrl: 'app/pages/tables/bstable/doc/index.html',
          title: 'BS表格介绍',
          sidebarMeta: {
            order: 9,
          },
        }).state('tables.bstablesearch', {
          url: '/bstablesearch',
          templateUrl: 'app/pages/tables/bstable/search/index.html',
          title: 'BS表格查询',
          sidebarMeta: {
            order: 10,
          },
        }).state('tables.bstablecommand', {
          url: '/bstablecommand',
          templateUrl: 'app/pages/tables/bstable/command/index.html',
          title: 'BS表格Command',
          sidebarMeta: {
            order: 11,
          },
        }).state('tables.bstabledetailview', {
          url: '/bstabledetailview',
          templateUrl: 'app/pages/tables/bstable/detail/index.html',
          title: 'BS表格Detail',
          sidebarMeta: {
            order: 12,
          },
        }).state('tables.bstablegroup', {
          url: '/bstablegroup',
          templateUrl: 'app/pages/tables/bstable/group/index.html',
          title: 'BS表格Group',
          sidebarMeta: {
            order: 13,
          },
        }).state('tables.bstabletreeview', {
          url: '/bstabletreeview',
          templateUrl: 'app/pages/tables/bstable/treeview/index.html',
          title: 'BS表格TreeView',
          sidebarMeta: {
            order: 14,
          },
        }).state('tables.bstablerowgroup', {
          url: '/bstablerowgroup',
          templateUrl: 'app/pages/tables/bstable/rowgroup/index.html',
          title: 'BS表格行分组',
          sidebarMeta: {
            order: 15,
          },
        });
    $urlRouterProvider.when('/tables','/tables/basic');
  }

})();
